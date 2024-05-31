import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/utils/supabase/database.types';
import { TransformedSchema, type TransformedSchemaType } from './schemas';

export const mapKeys = {
  all: ['map'] as const,
  lists: () => [...mapKeys.all, 'list'] as const,
  list: (filters: string) => [...mapKeys.lists(), { filters }] as const,
  details: () => [...mapKeys.all, 'detail'] as const,
  detail: (id: string) => [...mapKeys.details(), id] as const,
};

export const mapAPI = {
  getMapData: async (params: { supaClient: SupabaseClient<Database> }) => {
    const { supaClient } = params;

    const query = supaClient
      .from('Post')
      .select('id, Activity(id, name), User(id, username, Location(id, city, country, latitude, longitude)))');

    const response = (await query).data;

    const parsedSchema = TransformedSchema.safeParse(
      response?.map((item: any) => ({
        type: 'Feature',
        properties: {
          cluster: false,
          geojsonId: item.id,
          name: item.User?.username || '',
          continent: item.User?.Location?.country || '',
          activity: item.Activity?.name || '',
        },
        geometry: {
          type: 'Point',
          coordinates: [
            parseFloat(item.User?.Location?.latitude || '0'),
            parseFloat(item.User?.Location?.longitude || '0'),
          ],
        },
      })),
    );

    if (!parsedSchema.success) {
      console.error('Error parsing schema:', parsedSchema.error);
    }

    return {
      ...response,
      data: parsedSchema.success ? parsedSchema.data : null,
    };
  },
};
