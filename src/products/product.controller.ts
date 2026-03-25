import { Controller ,Get} from "@nestjs/common";
import { ProductService } from "./product.service";
import { Product } from "./product.interface";

interface ApiRespone<T> {
    success: boolean;
    data: T
    message: string;
}

@Controller('products')
export class ProductController {
    constructor(private readonly productService : ProductService){}

    @Get()
    findAll():ApiRespone<Product[]>{
        const products = this.productService.findAll();
        return {
            success: true,
            data:products,
            message:'Fetched products successfully'
        };
    }
 
}