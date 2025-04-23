import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, ParseUUIDPipe, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../auth/auth.guard';

@Controller("files")
export class FilesController {
    constructor(
        private readonly filesService: FilesService
    ) {};

    @UseGuards(AuthGuard)
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
            }))
        file: Express.Multer.File
    ) {
        return await this.filesService.uploadImgService(id, file);
    };
};
