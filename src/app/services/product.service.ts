import { Injectable } from '@angular/core';
import { ProductModel } from '../shared/models/api-models/poduct.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class ProductService
{
    constructor(private readonly http: HttpClient) { }

    public getAll(): Observable<ProductModel> {
        return this.http.get<ProductModel>(`${environment.apiUrl}/products/getAll`);
    }
}