import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'account', loadChildren: './account/account.module#AccountModule' },
  { path: 'home', loadChildren: './menuTabs/home/home.module#HomePageModule'},
  { path: 'profile', loadChildren: './menuTabs/profile/profile.module#ProfilePageModule'},
  { path: 'catalog', loadChildren: './catalog/catalog.module#CatalogPageModule'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
