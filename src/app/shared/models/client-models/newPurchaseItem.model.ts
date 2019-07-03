import { ProductType } from '../api-models/cart/purchaseItem.model';

export class NewPurchaseItemModel {

    name: string;

    userId: string;

    productId: string;

    qty: number;

    type: ProductType;

    costsPerOne: number;

}