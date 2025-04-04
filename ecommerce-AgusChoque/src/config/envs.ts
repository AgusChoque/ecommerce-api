import "dotenv/config";

//Database
export const DB_NAME: string | undefined = process.env.DB_NAME;
export const DB_HOST: string | undefined = process.env.DB_HOST;
export const DB_PORT: number = Number(process.env.DB_PORT);
export const DB_USERNAME: string | undefined = process.env.DB_USERNAME;
export const DB_PASSWORD: string | undefined = process.env.DB_PASSWORD;

//Cloudinary
export const CLOUDINARY_CLOUD_NAME: string | undefined = process.env.CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_API_KEY: string | undefined = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET: string | undefined = process.env.CLOUDINARY_API_SECRET;