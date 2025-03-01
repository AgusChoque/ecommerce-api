import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/Category.entity';
import { Repository } from 'typeorm';
import * as data from '../../data.json';

@Injectable()
export class CategoriesService {
    constructor (@InjectRepository(Category) private categoryRepository: Repository<Category>) {};

    async getCategories (): Promise<Category[]> {
        return await this.categoryRepository.find();
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
