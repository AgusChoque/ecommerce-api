import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { Category } from './entities/Category.entity';

@Injectable()
export class CategoriesService {
    constructor (private readonly categoriesRepository: CategoriesRepository) {};

    async getCategoriesService (): Promise<Category[]> {
        return await this.categoriesRepository.getCategoriesRepository();
    };

    async addCategoriesService (): Promise<string> {
        return await this.categoriesRepository.addCategoriesRepository();
    };
};
