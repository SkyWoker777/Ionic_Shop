export enum MagazineCategory
{
  AUTO = "auto",
  BUSINESS = "business",
  CHILDREN = "children",
  COMPUTER = "computer",
  COOKING = "cooking",
  CRAFT = "craft",
  ENTERTAINMENT = "entertainment",
  FASHION = "fashion",
  HEALTH = "health",
  HOME = "home",
  LIFESTYLE = "lifestyle",
  MENS = "mens",
  NEWS = "news",
  PARENTING = "parenting",
  PSYCHOLOGY = "psychology",
  SPORTS = "sports",
  TEEN = "teen",
  TRAVEL = "travel",
  WOMENS = "womens"
}

export class MagazineModel
{

    id: string;

    creationDate: string;

    type: string;

    name: string;

    publisher: string;

    year: number;

    price: number;

    category: MagazineCategory;
}