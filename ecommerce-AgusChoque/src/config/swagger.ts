import { DocumentBuilder } from "@nestjs/swagger";

export const swaggerConfig = new DocumentBuilder()
    .setTitle("")
    .setDescription("")
    .setVersion("1.0")
    .addBearerAuth()
    .build()