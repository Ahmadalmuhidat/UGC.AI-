import dotenv from 'dotenv';

dotenv.config();

export default {
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY,
  CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
  CLERK_WEBHOOK_SIGNING_SECRET: process.env.CLERK_WEBHOOK_SIGNING_SECRET,
  CLOUDINARY_URL: process.env.CLOUDINARY_URL,
  GOOGLE_CLOUD_API_KEY: process.env.GOOGLE_CLOUD_API_KEY
}