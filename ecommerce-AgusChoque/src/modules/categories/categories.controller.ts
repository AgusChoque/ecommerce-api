import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './entities/Category.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
    constructor (private readonly categoriesService: CategoriesService) {};

    @Get()
    async getCategories (): Promise<Category[]> {
        return await this.categoriesService.getCategoriesService();
    };

    @Get("seeder")
    addCategories() {
        return this.categoriesService.addCategoriesService();
    };
}
