import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MagazineModel } from '../shared/models/api-models/magazine.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class MagazineService
{
    constructor(private readonly http: HttpClient) { }

    public getMagazineById(id: string): Observable<MagazineModel> {
        return this.http.get<MagazineModel>(`${environment.apiUrl}/magazine/get/${id}`);
    }

    public getAllMagazines(): Observable<MagazineModel[]> {
        return this.http.get<MagazineModel[]>(`${environment.apiUrl}/magazine/getAll`);
    }
}