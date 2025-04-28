import { ApiBodyOptions, ApiParamOptions, ApiResponseOptions } from "@nestjs/swagger";

// POST "uploadImage/:id"
// Response
export const responsePostFile: ApiResponseOptions = {
    status: 200,
    description: "Successfully updated the product image. The updated product ID is returned as a string.",
    type: String
};
// Body
export const bodyImgPostFile: ApiBodyOptions = {
    description: "Image file to upload (jpg, jpeg, png, webp). Max size: 2KB.",
    schema: {
        type: 'object',
        properties: {
          image: {
            type: 'string',
            format: 'binary',
            description: 'Image file (must not exceed 2KB).',
          },
        },
        required: ['image']
    }
}
// Params
export const paramIdPostFile: ApiParamOptions = {
    name: "id",
    description: "Unique identifier of the product to update.",
    example: "5b2dae8b-f17c-48ca-bfc0-a7aed0883a44"
};