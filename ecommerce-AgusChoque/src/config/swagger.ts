import { DocumentBuilder } from "@nestjs/swagger";

export const swaggerConfig = new DocumentBuilder()
    .setTitle("E-commerce API")
    .setDescription("API for managing products. Created in an educational environment by Agustin Choque.")
    .setVersion("1.0")
    .addBearerAuth()
    .build()