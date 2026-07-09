import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const EnvSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  HOST: z.string().default("0.0.0.0"),

  PORT: z.coerce.number().default(3000),

  LOG_LEVEL: z.string().default("info"),

  API_PREFIX: z.string().default("/api"),
});

export const env = EnvSchema.parse(process.env);