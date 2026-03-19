import dotenv from 'dotenv';
dotenv.config();
import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number(),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  RABBITMQ_URLS: z.array(z.string()),
  RABBITMQ_QUEUE: z.string().default('ecommerce_queue'),
  DATABASE_URL: z.string(),
});

export type EnvType = z.infer<typeof envSchema>;

const result = envSchema.safeParse({
  ...process.env,
  RABBITMQ_URLS: process.env.RABBITMQ_URLS?.split(','),
});

if (!result.success) {
  console.error('Invalid environment variables:', z.treeifyError(result.error));
  process.exit(1);
}

export const env = result.data;
