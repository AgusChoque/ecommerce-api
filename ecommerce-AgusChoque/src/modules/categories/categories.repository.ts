import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./entities/Category.entity";
import { Repository } from "typeorm";
import * as data from "../../data.json";

@Injectable()
export class CategoriesRepository {
    constructor (@InjectRepository(Category) private categoryDbRepository: Repository<Category>) {};

    async getCategoriesRepository (): Promise<Category[]> {
        const categories: Category[] | null = await this.categoryDbRepository.find();
        if ( !categories.length ) throw new NotFoundException("Categories not found.");

        return categories;
    }

    async addCategoriesRepository (): Promise<string> {
        await Promise.all(data.map(async (element) => {
            this.categoryDbRepository
            .createQueryBuilder()
            .insert()
            .into(Category)
            .values({ name: element.category })
            .orIgnore("name")
            .execute()
        }))
        return "All categories loaded.";
    };
};