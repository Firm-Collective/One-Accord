import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/utils/supabase/database.types';
import { PostSchema, type PostSchemaType } from './schemas';

export const postKeys = {
  all: ['posts'] as const,
  lists: () => [...postKeys.all, 'list'] as const,
  list: (filters: string) => [...postKeys.lists(), { filters }] as const,
  details: () => [...postKeys.all, 'detail'] as const,
  detail: (id: string) => [...postKeys.details(), id] as const,
};

export const postAPI = {
  getPinnedPosts: async (params: { supaClient: SupabaseClient<Database>; from: number; pageSize: number }) => {
    const { supaClient, from, pageSize } = params;

    const query = supaClient
      .from('Post')
      .select(
        `
          *,
          Activity(id, name),
          Category(id, name),
          Tag(id, name),
          Sentiment(id, type),
          Keywords(id, words, frequency),
          Event(id, name),
          MediaType(id, type),
          User!inner(id, username, UserType:UserType!inner(id, name), Location:Location(id, city, country, latitude, longitude))
        `,
      )
      .in('User.UserType.name', ['Moderator', 'Influencer', 'Prophetic Organization'])
      .range(from, pageSize)
      .order('created_at', { ascending: false });

    const response = (await query).data;

    const parsedSchema = PostSchema.safeParse(response);

    if (!parsedSchema.success) {
      console.error('Error parsing schema:', parsedSchema.error);
    }

    return {
      ...response,
      data: parsedSchema.success ? parsedSchema.data : null,
    };
  },
  getInfluencerOrModeratorPosts: async (params: {
    supaClient: SupabaseClient<Database>;
    from: number;
    pageSize: number;
  }) => {
    const { supaClient, from, pageSize } = params;

    const query = supaClient
      .from('Post')
      .select(
        `
          *,
          Activity(id, name),
          Category(id, name),
          Tag(id, name),
          Sentiment(id, type),
          Keywords(id, words, frequency),
          Event(id, name),
          MediaType(id, type),
          User!inner(id, username, UserType:UserType!inner(id, name), Location:Location(id, city, country, latitude, longitude))
        `,
      )
      .in('User.UserType.name', ['Moderator', 'Influencer'])
      .range(from, pageSize)
      .order('created_at', { ascending: false });

    const response = (await query).data;

    const parsedSchema = PostSchema.safeParse(response);

    if (!parsedSchema.success) {
      console.error('Error parsing schema:', parsedSchema.error);
    }

    return {
      ...response,
      data: parsedSchema.success ? parsedSchema.data : null,
    };
  },

  getOtherPosts: async (params: { supaClient: SupabaseClient<Database>; from: number; pageSize: number }) => {
    const { supaClient, from, pageSize } = params;

    const query = supaClient
      .from('Post')
      .select(
        `
          *,
          Activity(id, name),
          Category(id, name),
          Tag(id, name),
          Sentiment(id, type),
          Keywords(id, words, frequency),
          Event(id, name),
          MediaType(id, type),
          User!inner(id, username, UserType:UserType!inner(id, name), Location:Location(id, city, country, latitude, longitude))
        `,
      )
      .range(from, pageSize)
      .in('User.UserType.name', ['Registered']) // add more types here?
      .order('created_at', { ascending: false });

    const response = (await query).data;

    const parsedSchema = PostSchema.safeParse(response);

    if (!parsedSchema.success) {
      console.error('Error parsing schema:', parsedSchema.error);
    }

    return {
      ...response,
      data: parsedSchema.success ? parsedSchema.data : null,
    };
  },
  getPostData: async (params: {
    supaClient: SupabaseClient<Database>;
}) => {
    const { supaClient } = params;

    const query = supaClient
    .from("Post")
    .select(`
      *,
      Activity(id, name),
      Category(id, name),
      Tag(id, name),
      Sentiment(id, type),
      Keywords(id, words, frequency),
      Event(id, name),
      MediaType(id, type),
      User(id, username, UserType:UserType(id, name), Location:Location(id, city, country, latitude, longitude))
    `).limit(100)
    .order('created_at', { ascending: false });
  
    const response = (await query).data;

    const parsedSchema = PostSchema.safeParse(response);
    

    if (!parsedSchema.success) {
        console.error("Error parsing schema:", parsedSchema.error);
      }

    return {
        ...response,
        data: parsedSchema.success ? parsedSchema.data : null,
      };
}
};
