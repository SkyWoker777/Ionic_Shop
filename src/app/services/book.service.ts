import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookModel } from '../shared/models/api-models/book.model';
import { environment } from '../../environments/environment';

@Injectable()
export class BookService
{
    constructor(private readonly http: HttpClient) { }

    public getBookById(id: string): Observable<BookModel> {
        return this.http.get<BookModel>(`${environment.apiUrl}/book/get/${id}`);
    }

    public getAllBooks(): Observable<BookModel[]> {
        return this.http.get<BookModel[]>(`${environment.apiUrl}/book/getAll`);
    }
}