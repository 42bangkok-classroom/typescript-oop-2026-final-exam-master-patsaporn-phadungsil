export interface PurchaseItem{
    productId: number;
    quantity: number;
    price: number;
}
export interface Purchase{
    id: number;
    customerName: string;
    purchaseDate: string;
    item: PurchaseItem;
    totalPrice: number;
}