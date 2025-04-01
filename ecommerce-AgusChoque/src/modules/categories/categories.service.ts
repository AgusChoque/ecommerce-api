import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/Category.entity';
import { Repository } from 'typeorm';
import * as data from '../../data.json';

@Injectable()
export class CategoriesService {
    constructor (@InjectRepository(Category) private categoryRepository: Repository<Category>) {};

    async getCategories (): Promise<Category[]> {
        const categories: Category[] | null = await this.categoryRepository.find();
        if ( !categories.length ) throw new NotFoundException("Categories not found.");

        return categories;
    }

    async addCategoriesService () {
        data.map(async (element) => {
            this.categoryRepository
            .createQueryBuilder()
            .insert()
            .into(Category)
            .values({ name: element.category })
            .orIgnore("name")
            .execute()
        })
        return "All categories loaded.";
    };

}
