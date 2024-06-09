import { z } from "zod";

// Define el esquema para la ubicación
const LocationSchema = z.object({
    id: z.string(),
    city: z.string(),
    country: z.string(),
    latitude: z.number(),
    longitude: z.number(),
});

// Define el esquema para la actividad
const ActivitySchema = z.object({
    id: z.string(),
    name: z.string(),
});

// Define el esquema para el usuario
const UserSchema = z.object({
    id: z.string(),
    username: z.string(),
    user_location_id: z.string().optional(),
    Location: LocationSchema,
});

// Define el esquema para los datos de entrada de la query
const PostSchema = z.object({
    id: z.string(),
    Activity: ActivitySchema,
    User: UserSchema,
});

// Define el esquema para los datos transformados
export const TransformedSchema = z.array(
    z.object({
        type: z.string(),
        properties: z.object({
            cluster: z.boolean(),
            geojsonId: z.string(),
            name: z.string(),
            country: z.string(),
            city: z.string(),
            activity: z.string(),
        }),
        geometry: z.object({
            type: z.string(),
            coordinates: z.array(z.number(), z.number()),
        }),
    })
);


export type TransformedSchemaType = z.infer<typeof TransformedSchema>;
export type PostSchemaType = z.infer<typeof PostSchema>;

