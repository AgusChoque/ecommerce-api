import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, ParseUUIDPipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductsService } from '../products/products.service';

@Controller("files")
export class FilesController {
    constructor(
        private readonly productsService: ProductsService,
        private readonly filesService: FilesService
    ) {};

    @Post("uploadImage/:id")
    @UseInterceptors(FileInterceptor("image"))
    async uploadImg (
        @Param("id", ParseUUIDPipe) id: string,
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({
                        maxSize: 200000,
                        message: "The file must not exceed 200kb."
                    }),
                    new FileTypeValidator({
                        fileType: /(jpg|jpeg|png|webp)/
                    }),
                ]
            })
        ) file: Express.Multer.File
    ) {
        const uploaded = await this.filesService.uploadImg(file);
        return await this.productsService.updateImg(id, uploaded.url);
    };
};
