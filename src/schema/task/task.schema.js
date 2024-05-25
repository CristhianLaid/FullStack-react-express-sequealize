import { z } from 'zod';

export const TaskSchema = z.object({
    title: z.string({ required_error: 'Title is required', invalid_type_error: 'Title must be a string' })
        .min(10, { message: 'Title must be at least 10 characters long' })
        .max(255, { message: 'Title cannot exceed 255 characters' }),
    description: z.string({ required_error: 'Description is requerid', invalid_type_error: 'Description must be a string' }),
    done: z.boolean().optional(),
});
