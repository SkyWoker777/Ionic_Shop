import { ProductModel } from './poduct.model';

export interface TokenAuthModel {

  expiresIn: number | string;

  accessToken: string;

  userId: string;

  firstName: string;

  lastName: string;

  email: string;

}