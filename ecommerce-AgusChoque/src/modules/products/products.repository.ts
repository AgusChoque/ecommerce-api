import { Injectable } from "@nestjs/common";
import { Product } from "./entities/Product.entity";

@Injectable()
export class ProductsRepository {
    private products: Product[] = [
        {
            id: 1,
            name: "Notebook Gamer",
            description: "Potente notebook con procesador Intel i7 y tarjeta gráfica RTX 3060.",
            price: 1500.99,
            stock: true,
            imgUrl: "https://example.com/notebook-gamer.jpg"
        },
        {
            id: 2,
            name: "Smartphone Pro",
            description: "Celular de última generación con pantalla OLED y 128GB de almacenamiento.",
            price: 999.99,
            stock: true,
            imgUrl: "https://example.com/smartphone-pro.jpg"
        },
        {
            id: 3,
            name: "Auriculares Inalámbricos",
            description: "Auriculares con cancelación de ruido y batería de larga duración.",
            price: 199.99,
            stock: false,
            imgUrl: "https://example.com/auriculares.jpg"
        },
        {
            id: 4,
            name: "Smart TV 55''",
            description: "Televisor 4K UHD con sistema operativo Android TV.",
            price: 799.99,
            stock: true,
            imgUrl: "https://example.com/smart-tv.jpg"
        },
        {
            id: 5,
            name: "Teclado Mecánico RGB",
            description: "Teclado con switches mecánicos y retroiluminación RGB personalizable.",
            price: 129.99,
            stock: true,
            imgUrl: "https://example.com/teclado-mecanico.jpg"
        },
        {
            id: 6,
            name: "Mouse Gamer",
            description: "Mouse ergonómico con sensor de alta precisión y botones programables.",
            price: 89.99,
            stock: true,
            imgUrl: "https://example.com/mouse-gamer.jpg"
        },
        {
            id: 7,
            name: "Monitor UltraWide 34''",
            description: "Monitor curvo de 34 pulgadas con resolución QHD y 144Hz.",
            price: 599.99,
            stock: false,
            imgUrl: "https://example.com/monitor-ultrawide.jpg"
        },
        {
            id: 8,
            name: "Silla Gamer",
            description: "Silla ergonómica con reposabrazos ajustables y soporte lumbar.",
            price: 349.99,
            stock: true,
            imgUrl: "https://example.com/silla-gamer.jpg"
        },
        {
            id: 9,
            name: "Disco SSD 1TB",
            description: "Unidad de almacenamiento SSD NVMe de 1TB para máxima velocidad.",
            price: 149.99,
            stock: true,
            imgUrl: "https://example.com/ssd-1tb.jpg"
        },
        {
            id: 10,
            name: "Router WiFi 6",
            description: "Router de última generación con tecnología WiFi 6 para mayor velocidad y cobertura.",
            price: 179.99,
            stock: true,
            imgUrl: "https://example.com/router-wifi6.jpg"
        }
    ];
    private id: number = 11;

    find (): Product[] {
        return this.products;
    };

    findOneById (id: number): Product {
        const product: Product | undefined = this.products.filter((prod: Product) => prod.id === id)[0];
        if(product) return product;
        else throw Error ("Product doesn't found.");
    }

    create (product: Omit<Product, "id">): Product {
        const newProduct: Product = {id: this.id, ... product};
        this.id++;
        return newProduct;
    }

    save (product: Product): void {
        this.products = this.products.filter((prod: Product) => prod.id !== product.id);
        this.products.push(product);
    }

    delete (id: number): void {
        this.products = this.products.filter((product: Product) => product.id !== id);
    }

};