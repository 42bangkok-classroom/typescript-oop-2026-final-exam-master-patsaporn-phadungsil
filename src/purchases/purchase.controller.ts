
import { Controller, Get } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { Purchase } from './purchase.interface';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

@Controller('purchases')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Get()
  findAll(): ApiResponse<Purchase[]> {
    const purchases = this.purchaseService.findAll();

    return {
      success: true,
      data: purchases,
      message: 'Fetched purchases successfully',
    };
  }
}