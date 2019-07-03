import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { TokenAuthModel } from 'src/app/shared/models/api-models/tokenAuth.model';
import { ResultMessageModel } from 'src/app/shared/models/api-models/result-message.model';
import { NewUserModel } from '../shared/models/newUser.model';
import { Storage } from '@ionic/storage';
import { PopupService } from './popup.service';
import { environment } from '../../environments/environment';
import { PurchaseService } from './purchase.service';

@Injectable()
export class AuthService {
  private currentUser: BehaviorSubject<NewUserModel> = new BehaviorSubject<NewUserModel>(
    null
  );
  public set CurrentUser(user: NewUserModel) {
    this.storage.set('local-user', user);
    this.currentUser.next(user);
  }
  public get CurrentUser() {
    return this.currentUser.getValue();
  }
  public saveCurrentUserAsync() {
    this.storage.get('local-user').then(val => {
      this.currentUser.next(val);
    });
  }

  public user: Observable<NewUserModel>;

  constructor(private readonly http: HttpClient, private storage: Storage, private readonly popupService: PopupService) {
    this.saveCurrentUserAsync();
    this.user = this.currentUser.asObservable();
   }

    public signIn(email: string, password: string): Observable<TokenAuthModel> {
      const body = { email: email, password: password };

      return this.http.post<TokenAuthModel>(`${environment.apiUrl}/auth/signIn`, body);
    }

    public signUp(user: NewUserModel) : Observable<ResultMessageModel> {
      return this.http.post<ResultMessageModel>(`${environment.apiUrl}/auth/signUp`, user);
    }

    public signOut() {
      this.CurrentUser = null;
    }

    public signOutWithConfirmationPopUp() {
      this.popupService.presentAlertConfirm('Sign Out', () => {
        this.CurrentUser = null;
      });
    }

    public confirmEmail(emailToken: string): Observable<ResultMessageModel>
    {
      return this.http.get<ResultMessageModel>(`${environment.apiUrl}/auth/confirmation/${emailToken}`);
    }
}