import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './entities/Category.entity';

@Controller('categories')
export class CategoriesController {
    constructor (private readonly categoriesService: CategoriesService) {};

    @Get()
    async getCategories (): Promise<Category[]> {
        return await this.categoriesService.getCategories();
    };

    @Get("seeder")
    addCategories() {
        return this.categoriesService.addCategoriesService();
    };
}
