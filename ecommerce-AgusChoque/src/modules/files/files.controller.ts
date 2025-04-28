import { Controller, FileTypeValidator, HttpCode, MaxFileSizeValidator, Param, ParseFilePipe, ParseUUIDPipe, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FilesService } from "./files.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { AuthGuard } from "../auth/guards/auth.guard";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { bodyImgPostFile, paramIdPostFile, responsePostFile } from "src/helpers/openApiFiles";

@ApiTags("Files")
@Controller("files")
export class FilesController {
    constructor(
        private readonly filesService: FilesService
    ) {};

    // OPEN API
    @ApiBearerAuth()
    @ApiResponse(responsePostFile)
    @ApiParam(paramIdPostFile)
    @ApiConsumes('multipart/form-data')
    @ApiBody(bodyImgPostFile)
    // AUTH
    @UseGuards(AuthGuard)
    // METHOD
    @HttpCode(200)
    @Post("uploadImage/:id")
    @UseInterceptors(FileInterceptor("image"))
    // HANDLER
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
