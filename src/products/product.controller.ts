import { Controller ,Get, Query, Param, Body, Delete } from "@nestjs/common";
import { ProductService } from "./product.service";


@Controller('products')
export class ProductController {
    constructor(private readonly productService : ProductService){}

    @Get()
    findAll(){
        return this.productService.findAll();
    }
 
}