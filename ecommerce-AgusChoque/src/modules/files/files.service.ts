import { Injectable } from '@nestjs/common';
import { FilesRepository } from './files.repository';
import { ProductsRepository } from '../products/products.repository';

@Injectable()
export class FilesService {
    constructor (
        private readonly productsRepository: ProductsRepository,
        private readonly filesRepository: FilesRepository
    ) {};

    async uploadImgService (id: string, file: Express.Multer.File): Promise<string> {
        const uploaded = await this.filesRepository.uploadImgRepository(file);
        return await this.productsRepository.updateImgRepository(id, uploaded.secure_url);
    };
};
