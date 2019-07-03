import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { InstagramService } from './services/instagram.service';
import { IonicStorageModule } from '@ionic/storage';
import { ProductService } from './services/product.service';
import { NativePageTransitions } from '@ionic-native/native-page-transitions/ngx';
import { BookService } from './services/book.service';
import { MagazineService } from './services/magazine.service';
import { CookieService } from 'ngx-cookie-service';
import { PurchaseService } from './services/purchase.service';
import { PopupService } from './services/popup.service';
import { ToastService } from './services/toast.service';

export const services = [
  AuthService,
  ProductService,
  InstagramService,
  BookService,
  MagazineService,
  PurchaseService,
  PopupService,
  ToastService
];

export const guards = [
  
];

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot({
      scrollPadding: false,
      scrollAssist: false}),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    CoreModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NativePageTransitions,
    CookieService,
    ...services,
    ...guards,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
