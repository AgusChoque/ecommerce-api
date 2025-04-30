import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./entities/Product.entity";
import { Repository } from "typeorm";
import { Category } from "../categories/entities/Category.entity";
import { ProductDto } from "./dto/product.dto";
import * as data from "../../data.json";

@Injectable()
export class ProductsRepository {
    constructor (
        @InjectRepository(Product) 
        private readonly productsDbRepository: Repository<Product>,
        @InjectRepository(Category)
        private readonly categoryDbRepository: Repository<Category>
    ) {}

    async getProductsRepository (page: number, limit: number): Promise<Product[]> {
        const start = (page - 1) * limit;
        const end = start + limit;

        const products: Product[] = (await this.productsDbRepository.find({relations:{ category: true }})).slice(start, end);
        if ( !products.length ) throw new NotFoundException("Products not found.");

        return products;
    };

    async getProductRepository (id: string): Promise<Product> {
        const product: Product | null = await this.productsDbRepository.findOne({
            where: { id },
            relations: { category: true }
        });
        if ( !product ) throw new NotFoundException("Product not found.");
        return product;
    };

    async seederProductsRepository (): Promise<string> {
        const categories = await this.categoryDbRepository.find();

        await Promise.all(data.map(async (product) => {
            const category: Category | undefined = categories.find(element => element.name === product.category);
            const newProduct: Product = await this.productsDbRepository.create({...product, category});

            await this.productsDbRepository
            .createQueryBuilder()
            .insert()
            .into(Product)
            .values(newProduct)
            .orUpdate(["description", "price", "imgUrl", "stock"], ["name"])
            .execute();
        }));

        return "All products loaded.";
    };

    async createProductRepository ({price, category, ...product}: ProductDto): Promise<string> {
        const categoryDb: Category | null = await this.categoryDbRepository.findOneBy({ id: category });
        if ( !categoryDb ) throw new NotFoundException("Category not found.");

        const newProduct: Product = await this.productsDbRepository.create({price: Number(price), category: categoryDb, ...product});
        await this.productsDbRepository.save(newProduct);
        return newProduct.id;
    };

    async updateProductRepository (id: string, {price, category, ...newProduct}: ProductDto): Promise<string> {
        const productDb = await this.productsDbRepository.findOneBy({ name: newProduct.name });
        if ( productDb && productDb.id !== id ) throw new ConflictException("A product with this name already exists.")
        const categoryDb: Category | null = await this.categoryDbRepository.findOneBy({ id: category });
        if ( !categoryDb ) throw new NotFoundException("Category not found.");

        await this.productsDbRepository.update(id, {price: Number(price), category: categoryDb, ...newProduct});

        const product = await this.productsDbRepository.findOneBy({id});
        if( !product ) throw new NotFoundException('Product not found.');

        return id;
    };

    async updateImgRepository (id: string, url: string): Promise<string> {
        const product: Product | null = await this.productsDbRepository.findOneBy({id});
        if( !product ) throw new NotFoundException('Product not found.');

        product.imgUrl = url;
        await this.productsDbRepository.save(product);
        return id;
    };

    async deleteProductRepository (id: string): Promise<string> {
        await this.productsDbRepository.delete(id);
        return id;
    };
};