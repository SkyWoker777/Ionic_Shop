import { BookCategory } from '../api-models/book.model';

export class MenuBookModel {
    id: string;

    name: string;

    authors: string;

    description: string;

    price: number;

    category: BookCategory;

    type: string;
}