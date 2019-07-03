import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { NewUserModel } from 'src/app/shared/models/newUser.model';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private user: NewUserModel;

  constructor(private readonly authService: AuthService) {
    this.authService.user.subscribe((val) => {
      this.user = val;
    });
   }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    if (this.user == null || this.user.token == null)
    {
      return next.handle(request);
    }
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.user.token}`
      }
    });
    return next.handle(request);
  }
}