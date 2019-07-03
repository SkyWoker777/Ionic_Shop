export enum ProductType {
    BOOK = "book",
    MAGAZINE = "magazine"
  }

export class PurchaseItemModel
{
    id: string;

    name: string;

    creationDate: string;

    userId: string;

    productId: string;

    qty: number;

    type: ProductType;

    costsPerOne: number;
}