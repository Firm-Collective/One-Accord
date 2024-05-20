import { z } from 'zod';

// Location Schema
const LocationSchema = z.object({
  id: z.string().uuid(),
  city: z.string(),
  country: z.string(),
  latitude: z.string(),
  longitude: z.string()
});

// UserType Schema
const UserTypeSchema = z.object({
  id: z.string().uuid(),
  name: z.string()
});

// User Schema
const UserSchema = z.object({
  id: z.string().uuid(),
  user_type_id: UserTypeSchema.shape.id,
  user_location_id: LocationSchema.shape.id,
});

// Category Schema
const CategorySchema = z.object({
  id: z.string().uuid(),
  name: z.string()
});

// Sentiment Schema
const SentimentSchema = z.object({
  id: z.string().uuid(),
  type: z.number()
});

// MediaType Schema
const MediaTypeSchema = z.object({
  id: z.string().uuid(),
  type: z.string()
});

// Keywords Schema
const KeywordsSchema = z.object({
  id: z.string().uuid(),
  words: z.array(z.string()),
  frequency: z.record(z.number())
});

// Tag Schema
const TagSchema = z.object({
  id: z.string().uuid().nullish(),
  name: z.array(z.string()),
  country_keyword: z.array(z.string()),
  bible_keyword: z.array(z.string())
});

// Event Schema
const EventSchema = z.object({
  id: z.string().uuid(),
  name: z.string()
});

// Activity Schema
const ActivitySchema = z.object({
  id: z.string().uuid(),
  name: z.string()
});

// Post Schema
export const PostSchema = z.array(
  z.object({
    id: z.string().uuid(),
    content: z.string(),
    is_visible: z.boolean(),
    is_offensive: z.boolean(),
    user_id: UserSchema.shape.id,
    activity_id: ActivitySchema.shape.id,
    category_id: CategorySchema.shape.id,
    tag_id: TagSchema.shape.id.nullish(),
    sentiment_id: SentimentSchema.shape.id,
    keywords_id: KeywordsSchema.shape.id,
    event_id: EventSchema.shape.id,
    media_type_id: MediaTypeSchema.shape.id,
    created_at: z.string()
  })
);

export const CreteContentPostSchema = z.object({
  content: z.string(),
})

export const CretePostSchema = z.object({
    content: z.string(),
    is_visible: z.boolean(),
    is_offensive: z.boolean(),
    user_id: UserSchema.shape.id,
    activity_id: ActivitySchema.shape.id,
    category_id: CategorySchema.shape.id,
    tag_id: TagSchema.shape.id.nullish(),
    sentiment_id: SentimentSchema.shape.id,
    keywords_id: KeywordsSchema.shape.id,
    event_id: EventSchema.shape.id,
    media_type_id: MediaTypeSchema.shape.id,
    created_at: z.string()
})


export type PostSchemaType = z.infer<typeof PostSchema>;
export type CreteContentPostSchemaType = z.infer<typeof CreteContentPostSchema>;
export type CretePostSchemaType = z.infer<typeof CretePostSchema>;



