import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/utils/supabase/database.types";
import { UserTypeArr, UserSchema, UserType } from "./schemas";

export const userKeys = {
    all: ["users"] as const,
    lists: () => [...userKeys.all, "list"] as const,
    list: (filters: string) => [...userKeys.lists(), { filters }] as const,
    details: () => [...userKeys.all, "detail"] as const,
    detail: (id: string) => [...userKeys.details(), id] as const,
  };

export const userAPI = {
    getUserData: async (params: {
        supaClient: SupabaseClient<Database>;
        userId: string
    }) => {
        const { supaClient, userId } = params;

        const query = supaClient
        .from("User")
        .select("id, username, birth_year, UserType(id, name), Location(id, city, country)")   
        .eq("id", userId)
        .single()

        const response = (await query).data;

        const parsedSchema = UserSchema.safeParse(response);        

        if (!parsedSchema.success) {
            console.error("Error parsing User schema:", parsedSchema.error);
          }

        return {
            ...response,
            data: parsedSchema.success ? parsedSchema.data : null,
          };
    },
    getUserTypeData: async (params: {
        supaClient: SupabaseClient<Database>;
    }) => {
        const { supaClient } = params;

        const query = supaClient
        .from("UserType")
        .select("*")      
        const response = (await query).data;

        const parsedSchema = UserTypeArr.safeParse(response);
        

        if (!parsedSchema.success) {
            console.error("Error parsing UserType schema:", parsedSchema.error);
          }

        return {
            ...response,
            data: parsedSchema.success ? parsedSchema.data : null,
          };
    },
    getUserTypeByIdData: async (params: {
      supaClient: SupabaseClient<Database>;
      userId: string
  }) => {
      const { supaClient, userId } = params;
      console.log("🚀 ~ userId endpoint:", userId)

      const query = await supaClient
      .from("User")
      .select("UserType(id, name)")  
      .eq("id", userId)    
      .single()

      const response = (await query).data;

      const parsedSchema = UserType.safeParse(response?.UserType);
      

      if (!parsedSchema.success) {
          console.error("Error parsing UserType by user in schema:", parsedSchema.error);
        }

      return {
          ...response,
          data: parsedSchema.success ? parsedSchema.data : null,
        };
  }
}