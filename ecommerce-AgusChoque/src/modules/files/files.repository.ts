import { HttpException, Injectable } from "@nestjs/common";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import * as toStream from "buffer-to-stream";


@Injectable()
export class FilesRepository {
    async uploadImgRepository (file: Express.Multer.File): Promise<UploadApiResponse> {
        return new Promise ((resolve, reject) => {
            const upload = cloudinary.uploader.upload_stream( { resource_type: 'auto' }, (error, result) => {
                if (error) reject(error);
                else if (!result) throw new HttpException({ status: 500, error: "Upload failed: No result returned from Cloudinary." }, 500)
                else resolve(result);
            });
            toStream(file.buffer).pipe(upload);
        })
    };
};