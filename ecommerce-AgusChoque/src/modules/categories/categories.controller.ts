import { Controller, Get, HttpCode } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { responseGetCategories, responseGetSeederCategories } from 'src/helpers/openApiCategories';
import { CategoriesResponseDto } from './dto/categoriesResponse.dto';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
    constructor (private readonly categoriesService: CategoriesService) {};

    // OPEN API
    @ApiOperation({ summary: "Get a list of categories." })
    @ApiResponse(responseGetCategories)
    // HTTP METHOD
    @HttpCode(200)
    @Get()
    // HANDLER
    async getCategories (): Promise<CategoriesResponseDto[]> {
        return await this.categoriesService.getCategoriesService();
    };

    // OPEN API
    @ApiOperation({ summary: "Perform the preloading of categories." })
    @ApiResponse(responseGetSeederCategories)
    // HTTP METHOD
    @HttpCode(201)
    @Get("seeder")
    // HANDLER
    addCategories(): Promise<string> {
        return this.categoriesService.addCategoriesService();
    };
}
