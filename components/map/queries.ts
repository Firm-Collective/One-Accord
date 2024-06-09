import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/utils/supabase/database.types";
import { TransformedSchema } from "./schemas";

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
    bounds: { ne: [number, number]; sw: [number, number] }; // north-east and south-west bounds
  }) => {
    const { supaClient, bounds } = params;

    const { ne, sw } = bounds;
    const { data, error } = await supaClient
      .rpc("get_filtered_user_in_map", {
        ne_latitude: ne[1],
        ne_longitude: ne[0],
        sw_latitude: sw[1],
        sw_longitude: sw[0]
      });

    if (error) {
      console.error("Error fetching filtered posts:", error);
      return {
        data: null,
        error
      };
    } else {
      const parsedSchema = TransformedSchema.safeParse(data);

      if (!parsedSchema.success) {
        console.error("Error parsing schema:", parsedSchema.error);
        return {
          data: null,
          error: parsedSchema.error
        };
      }

      return {
        data: parsedSchema.data,
        error: null
      };
    }
  }
};
