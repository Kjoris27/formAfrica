import { config } from 'dotenv'


config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const { PORT = 5500,
    NODE_ENV = 'development',
    DB_URI,
    JWT_SECRET,
    JWT_EXPIRES_IN = '1h',
    ARCJET_KEY,
    ARCJET_ENV,
     } = process.env;