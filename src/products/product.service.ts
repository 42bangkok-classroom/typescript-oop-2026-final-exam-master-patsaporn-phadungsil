import { Product } from "./product.interface";
import { readFileSync , writeFileSync } from "fs";


export class ProductService {
    findAll(){
        const file = readFileSync('./data/product.json' , 'utf-8');
        const products: Product[] = JSON.parse(file);
        return products;
    }
}