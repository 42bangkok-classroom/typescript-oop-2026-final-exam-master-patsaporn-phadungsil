import { Injectable } from '@nestjs/common';
import { readFileSync ,writeFileSync} from 'fs';
import { Purchase } from './purchase.interface';
import type { CreatePurchaseDto } from './dto/create-purchase.dto';

@Injectable()
export class PurchaseService {
  private purchases: Purchase[] = [];

  constructor() {
    const data = readFileSync('data/purchases.json', 'utf-8');
    this.purchases = JSON.parse(data) as Purchase[];
  }

 
  findAll(query?: {
    customerName?: string;
    startDate?: string;
    endDate?: string;
  }): Purchase[] {
    let result = this.purchases;

    if (!query) return result;

    const { customerName, startDate, endDate } = query;

   
    if (customerName) {
      result = result.filter((p) =>
        p.customerName.toLowerCase().includes(customerName.toLowerCase()),
      );
    }

   
    if (startDate) {
      result = result.filter(
        (p) => new Date(p.purchaseDate) >= new Date(startDate),
      );
    }

    
    if (endDate) {
      result = result.filter(
        (p) => new Date(p.purchaseDate) <= new Date(endDate),
      );
    }

    return result;
}
findOne(id: number): Purchase | undefined {
    return this.purchases.find((p) => p.id === id);
  }
  create(dto: CreatePurchaseDto): Purchase {
    const productsData = readFileSync('data/products.json', 'utf-8');
    const products = JSON.parse(productsData) as {
      id: number;
      price: number;
    }[];

    const newId =
      this.purchases.length > 0
        ? this.purchases[this.purchases.length - 1].id + 1
        : 1;

    const items = dto.items.map((item) => {
      const product = products.find((p) => p.id === item.productId);

      const price = product ? product.price : 0;

      return {
        productId: item.productId,
        quantity: item.quantity,
        price,
      };
    });

    const totalPrice = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    const newPurchase: Purchase = {
      id: newId,
      customerName: dto.customerName,
      purchaseDate: dto.purchaseDate,
      items,
      totalPrice,
    };

    this.purchases.push(newPurchase);

    writeFileSync(
      'data/purchases.json',
      JSON.stringify(this.purchases, null, 2),
    );

    return newPurchase;
  }
}
