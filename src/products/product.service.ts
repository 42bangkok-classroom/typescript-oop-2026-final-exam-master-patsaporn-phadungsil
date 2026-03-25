import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Product } from './product.interface';

@Injectable()
export class ProductService {
  private readonly filePath = join(process.cwd(), 'data', 'products.json');

  findAll(): Product[] {
    const data = readFileSync(this.filePath, 'utf-8');
    return JSON.parse(data) as Product[];
  }
}