import { NgModule } from '@angular/core';
import { HomePage } from './home.page';
import { SharedModule } from '../../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { CartPage } from './cart/cart.page';
import { AllProductsPage } from './allProducts/allProducts.page';
import { InfoPageModule } from 'src/app/infoPage/info-page.module';
import { AccountModule } from 'src/app/account/account.module';

@NgModule({
  imports: [
    HomeRoutingModule,
    SharedModule,
    InfoPageModule
  ],
  declarations: [HomePage, AllProductsPage, CartPage]
})
export class HomePageModule {
}
