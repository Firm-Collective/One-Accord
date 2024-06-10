import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/utils/supabase/database.types';
import { QuestionsSchema } from './schemas';

export const questionsAPI = {
  getQuestionsData: async (params: { supaClient: SupabaseClient<Database>, lastIndex: number, range: number }) => {
    const { supaClient, lastIndex, range } = params;
    console.log("🚀 ~ getQuestionsData: ~ lastIndex:", lastIndex);

    const query = supaClient
      .from('Questions')
      .select('*')
      .range(lastIndex, lastIndex + range - 1);

    const response = (await query).data;
    console.log('🚀 ~ getQuestionsData: ~ response:', response);

    const parsedSchema = QuestionsSchema.safeParse(response);
    console.log('🚀 ~ getQuestionsData: ~ parsedSchema:', parsedSchema);

    if (!parsedSchema.success) {
      console.error('Error parsing questions schema:', parsedSchema.error);
      return {
        data: null,
        error: parsedSchema.error,
      };
    }

    return {
      data: parsedSchema.data,
      error: null,
    };
  },

  getLastQuestionIndex: async (params: { supaClient: SupabaseClient<Database> }) => {
    const { supaClient } = params;

    const query = supaClient
      .from('LastQuestionIndex')
      .select('last_index')
      .order('id', { ascending: false })
      .limit(1);

    const response = (await query).data;
    console.log('🚀 ~ getLastQuestionIndex: ~ response:', response);

    if (!response || response.length === 0) {
      console.error('Error retrieving last question index or no data found');
      return {
        data: 0, 
        error: 'Error retrieving last question index or no data found',
      };
    }

    return {
      data: response[0].last_index,
      error: null,
    };
  },

  saveLastQuestionIndex: async (params: { supaClient: SupabaseClient<Database>, lastQuestionIndex: number }) => {
    const { supaClient, lastQuestionIndex } = params;
    console.log("🚀 ~ saveLastQuestionIndex: ~ lastQuestionIndex:", lastQuestionIndex);

    const query = supaClient
      .from('LastQuestionIndex')
      .update({ last_index: lastQuestionIndex })
      .eq('id', 1); 

    const response = (await query).data;
    console.log('🚀 ~ saveLastQuestionIndex: ~ response:', response);

    if (!response || response.length === 0) {
      console.error('Error saving last question index');
      return {
        data: null,
        error: 'Error saving last question index',
      };
    }

    return {
      data: response,
      error: null,
    };
  },
};
