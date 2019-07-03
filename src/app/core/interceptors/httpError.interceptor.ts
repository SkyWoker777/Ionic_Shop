import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http';
import { Router } from '@angular/router';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { ToastController } from '@ionic/angular';


@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(private readonly router: Router, private readonly authService: AuthService,
        public toastController: ToastController) { }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(catchError( (errorResp: HttpErrorResponse) => {
                let httpErrorStatus = errorResp.status;
                let errorMessage = '';

                switch(httpErrorStatus)
                {
                    case 400: {
                        errorMessage = errorResp.error;
                        new Promise( async () => {
                            const toast = await this.toastController.create({
                                message: errorMessage,
                                color: 'danger',
                                showCloseButton: true,
                                closeButtonText: 'Got it!',
                                duration: 6000
                              });
                            toast.present();
                        });
                        break;
                    }
                    case 401: {
                        this.authService.signOut();
                        break;
                    }
                    case 403: {
                        this.router.navigate(['/home']);
                        break;
                    }
                    default: {
                        errorMessage = "The server is not responding. Try again later...";
                        new Promise( async () => {
                            const toast = await this.toastController.create({
                                message: errorMessage,
                                color: 'danger',
                                showCloseButton: true,
                                closeButtonText: 'Got it!',
                                duration: 6000
                              });
                            toast.present();
                        });
                        break;
                    }
                }

                return throwError(errorMessage);
            }));
    }
}