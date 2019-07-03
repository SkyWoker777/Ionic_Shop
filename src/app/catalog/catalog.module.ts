import { NgModule } from '@angular/core';
import { CatalogPage } from './catalog.page';
import { SharedModule } from '../shared/shared.module';
import { CatalogRoutingModule } from './catalog-routing.module';
import { TypesPage } from './types/types.page';
import { ProductListPage } from './productList/productList.page';
import { InfoPageModule } from '../infoPage/info-page.module';

@NgModule({
  imports: [
    CatalogRoutingModule,
    SharedModule,
    InfoPageModule
  ],
  declarations: [ CatalogPage, TypesPage, ProductListPage]
})
export class CatalogPageModule {
}