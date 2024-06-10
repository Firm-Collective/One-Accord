import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/utils/supabase/database.types";
import { TransformedSchema, type TransformedSchemaType } from "./schemas";

export const mapKeys = {
    all: ["map"] as const,
    lists: () => [...mapKeys.all, "list"] as const,
    list: (filters: string) => [...mapKeys.lists(), { filters }] as const,
    details: () => [...mapKeys.all, "detail"] as const,
    detail: (id: string) => [...mapKeys.details(), id] as const,
  };

export const mapAPI = {
    getMapData: async (params: {
        supaClient: SupabaseClient<Database>;
    }) => {
        const { supaClient } = params;

        const query = supaClient.from("Post").select("id, Activity(id, name), User(id, username, Location(id, city, country, latitude, longitude)))");

        const response = (await query).data;

        const parsedSchema = TransformedSchema.safeParse(
            response?.map((item: any) => {
              const latitude = parseFloat(item.User?.Location?.latitude);
              const longitude = parseFloat(item.User?.Location?.longitude);
          
              // Check for valid latitude and longitude range
              if (
                isNaN(latitude) || isNaN(longitude) ||
                latitude < -90 || latitude > 90 ||
                longitude < -180 || longitude > 180
              ) {
                // console.warn(`Invalid coordinates for item: ${item.id}, latitude: ${latitude}, longitude: ${longitude}`);
                return null; 
              }
          
              return {
                type: "Feature",
                properties: {
                  cluster: false,
                  geojsonId: item.id,
                  name: item.User?.username || "",
                  country: item.User?.Location?.country || "",
                  city: item.User?.Location?.city || "",
                  activity: item.Activity?.name || "",
                },
                geometry: {
                  type: "Point",
                  coordinates: [longitude, latitude],
                },
              };
            }).filter(Boolean) 
          );
          
          if (!parsedSchema.success) {
            console.error("Error parsing schema:", parsedSchema.error);
          }
          
          
          if (!parsedSchema.success) {
            console.error("Error parsing schema:", parsedSchema.error);
          }
          
        

        if (!parsedSchema.success) {
            console.error("Error parsing schema:", parsedSchema.error);
          }

        return {
            ...response,
            data: parsedSchema.success ? parsedSchema.data : null,
          };
    }
}