import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { Purchase } from './purchase.interface';

@Injectable()
export class PurchaseService {
  private purchases: Purchase[] = [];

  constructor() {
    const data = readFileSync('data/purchases.json', 'utf-8');
    this.purchases = JSON.parse(data) as Purchase[];
  }

  findAll(): Purchase[] {
    return this.purchases;
  }
}