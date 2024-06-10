import { z } from 'zod';

export const QuestionsSchema = z.array(z.object({
    id: z.number(),
    name: z.string(),
}));
