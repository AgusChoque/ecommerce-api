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
        const categories: string[] = data.map((product) => { return product.category });
        const uniqueCategories: string[] = [... new Set (categories)];
        
        const dbCategories: string[] = (await this.categoryRepository.find()).map((category: Category) => { return category.name })
        const areEquals = JSON.stringify(uniqueCategories.sort()) === JSON.stringify(dbCategories.sort());

        if( !dbCategories.length ) {
            await uniqueCategories.map(async (name) => {
                const newCategory: Category = await this.categoryRepository.create({ name });
                await this.categoryRepository.save(newCategory);
            });
        } else if ( !areEquals ) {
            const added: string[] = uniqueCategories.filter((name) => { !dbCategories.includes(name) });
            const deleted: string[] = dbCategories.filter((name) => { !uniqueCategories.includes(name) });

            if (added.length) {
                await added.map(async (name) => {
                    const newCategory: Category = await this.categoryRepository.create({ name });
                    await this.categoryRepository.save(newCategory);
                });
            };
            if (deleted.length) {
                await deleted.map(async (name) => {
                    const deletedCategory: Category | null = await this.categoryRepository.findOneBy({ name });
                    if( deletedCategory ) {
                        await this.categoryRepository.delete(deletedCategory.id);
                    };
                });
            };
        };

        return "All categories loaded.";
    };

}
