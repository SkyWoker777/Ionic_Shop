import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { InfoRoutingModule } from './info-page-routing.module';
import { InfoPage } from './info.page';

@NgModule({
  imports: [
    InfoRoutingModule,
    SharedModule
  ],
  declarations: [ InfoPage ]
})
export class InfoPageModule {
}