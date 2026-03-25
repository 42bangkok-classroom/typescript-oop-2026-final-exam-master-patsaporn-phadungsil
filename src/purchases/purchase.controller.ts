
import { Controller, Get ,Query} from '@nestjs/common';
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
  findAll(
    @Query('customerName') customerName?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ): ApiResponse<Purchase[]> {
    const hasFilter = customerName || startDate || endDate;

    const purchases = this.purchaseService.findAll({
      customerName,
      startDate,
      endDate,
    });

    return {
      success: true,
      data: purchases,
      message: hasFilter
        ? 'Filtered purchases successfully'
        : 'Fetched purchases successfully',
    };
  }
}