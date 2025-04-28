import { Controller, Get, HttpCode } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './entities/Category.entity';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { responseGetCategories, responseGetSeederCategories } from 'src/helpers/openApiCategories';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
    constructor (private readonly categoriesService: CategoriesService) {};

    // OPEN API
    @ApiResponse(responseGetCategories)
    // HTTP METHOD
    @HttpCode(200)
    @Get()
    // HANDLER
    async getCategories (): Promise<Category[]> {
        return await this.categoriesService.getCategoriesService();
    };

    // OPEN API
    @ApiResponse(responseGetSeederCategories)
    // HTTP METHOD
    @HttpCode(201)
    @Get("seeder")
    // HANDLER
    addCategories(): Promise<string> {
        return this.categoriesService.addCategoriesService();
    };
}
