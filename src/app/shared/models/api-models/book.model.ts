
export enum BookCategory 
{
  ACTION = "action",
  ANTHOLOGY = "anthology",
  CHILDRENS = "choldrens",
  COMICBOOK = "comicbook",
  CRIME = "crime",
  DRAMA = "drama",
  FAIRYTALE = "fairytale",
  FANTASY = "fantasy",
  HISTORY = "history",
  HORROR = "horror",
  MYSTERY = "mystery",
  NOVEL = "novel",
  POETRY = "poetry",
  ROMANCE = "romance",
  SATIRE = "satire",
  SCIENCEFICTION = "sciencefiction",
  SHORTSTORY = "shortstory",
  THRILLER = "thriller"
}

export class BookModel
{
    id: string;

    creationDate: string;

    name: string;

    authors: string;

    description: string;

    price: number;

    year: number;

    category: BookCategory;
}