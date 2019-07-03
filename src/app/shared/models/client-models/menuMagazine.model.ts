import { MagazineCategory } from '../api-models/magazine.model';

export class MenuMagazineModel {

    id: string;

    type: string;

    name: string;

    publisher: string;

    price: number;

    category: MagazineCategory;
}