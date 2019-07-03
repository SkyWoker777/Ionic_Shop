import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { PurchaseItemModel } from '../shared/models/api-models/cart/purchaseItem.model';
import { NewPurchaseItemModel } from '../shared/models/client-models/newPurchaseItem.model';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage';
import { AuthService } from './auth.service';

@Injectable()
export class PurchaseService {
  private currentCountOfPurchases: BehaviorSubject<number> = new BehaviorSubject<number>(
    null
  );
  public set CurrentCountOfPurchases(count: number) {
    this.storage.set('count-of-purchases', count);
    this.currentCountOfPurchases.next(count);
  }
  public get CurrentCountOfPurchases() {
    return this.currentCountOfPurchases.getValue();
  }
  public saveCurrentCountOfPurchases() {
    this.authService.user.subscribe((user) => {
      if (!user) {
        this.CurrentCountOfPurchases = null;
        return;
      }

      this.getCountOfPurchaseByUserId(this.authService.CurrentUser.id).subscribe(val => {
        this.currentCountOfPurchases.next(val);
      });
    });
  }
  public countOfPurchases: Observable<number>;

  constructor(private readonly http: HttpClient, private storage: Storage, private authService: AuthService) {
    this.saveCurrentCountOfPurchases();
    this.countOfPurchases = this.currentCountOfPurchases.asObservable();
  }

  public createPurchase(purchase: NewPurchaseItemModel): Observable<boolean> {
    return this.http.post<boolean>(`${environment.apiUrl}/purchase/createPurchase`, purchase);
  }

  public getPurchaseByUserId(userId: string): Observable<PurchaseItemModel[]> {
    return this.http.get<PurchaseItemModel[]>(`${environment.apiUrl}/purchase/getPurchaseByUserId/${userId}`);
  }

  public getCountOfPurchaseByUserId(userId: string): Observable<number> {
    return this.http.get<number>(`${environment.apiUrl}/purchase/getCountOfPurchaseByUserId/${userId}`);
  }

  public updatePurchase(purchase: PurchaseItemModel): Observable<boolean> {
    return this.http.put<boolean>(`${environment.apiUrl}/purchase/updatePurchase`, purchase);
  }

  public deletePurchase(purchaseId: string): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.apiUrl}/purchase/delete/${purchaseId}`);
  }
}