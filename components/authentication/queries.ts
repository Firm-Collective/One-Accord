import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/utils/supabase/database.types";
import { UserTypeArr } from "./schemas";


export const userAPI = {
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
    }
}