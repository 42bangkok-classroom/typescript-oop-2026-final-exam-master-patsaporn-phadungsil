import { Product } from "./product.interface";
import { readFileSync , writeFileSync } from "fs";
import { Injectable } from "@nestjs/common";
import { join } from "path";

@Injectable()
export class ProductService {
    private readonly filePath = join(process.cwd(), 'data', 'product.json');
    findAll(): Product[]{
        const data = readFileSync(this.filePath , 'utf-8');

        return JSON.parse(data);
    }
}