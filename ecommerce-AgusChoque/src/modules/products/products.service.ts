import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './entities/Product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as data from "../../data.json";
import { Category } from '../categories/entities/Category.entity';
import { updateProductDto } from './dto/updateProduct.dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product) private productsRepository: Repository<Product>,
        @InjectRepository(Category) private categoryRepository: Repository<Category>
    ) {};

    async getAllProducts (page: number, limit: number): Promise<Product[]> {
        const start = (page - 1) * limit;
        const end = start + limit;

        const products: Product[] = await this.productsRepository.find({relations:{ category: true }});
        if ( !products.length ) throw new NotFoundException("Products not found.");

        return products.slice(start, end);
    };

    async getProductById (id: string): Promise<Product> {
        const product: Product | null = await this.productsRepository.findOneBy({id});
        if ( !product ) throw new NotFoundException("Product not found.");
        return product;
    };

    async createProduct (newProduct: Omit<Product, "id">): Promise<string> {
        const product: Product = await this.productsRepository.create(newProduct);
        this.productsRepository.save(product);
        return product.id;
    };

    async updateProduct ({id, newData}: updateProductDto): Promise<string> {
        let product: Product | null = await this.productsRepository.findOneBy({id});
        if (!product) throw new NotFoundException("Product not found.");
        
        product = {...product, ... newData};
        this.productsRepository.save(product);
        return id;
    };

    async deleteProduct (id: string): Promise<string> {
        await this.productsRepository.delete(id);
        return id;
    };

    async seederProducts (): Promise<string> {
        const categories = await this.categoryRepository.find();

        await data.map(async (product) => {
            const category: Category | undefined = categories.find(element => element.name === product.category);
            const newProduct: Product = this.productsRepository.create({...product, category});

            await this.productsRepository
            .createQueryBuilder()
            .insert()
            .into(Product)
            .values(newProduct)
            .orUpdate(["description", "price", "imgUrl", "stock"], ["name"])
            .execute();
        });

        return "All products loaded.";
    };

    async updateImg (id: string, url: string): Promise<string> {
        const product: Product | null = await this.productsRepository.findOneBy({id});
        if (!product) throw new NotFoundException("Product not found.");

        product.imgUrl = url;
        await this.productsRepository.save(product);
        return id;
    };

};
