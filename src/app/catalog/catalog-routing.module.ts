
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { CatalogPage } from './catalog.page';
import { TypesPage } from './types/types.page';
import { ProductListPage } from './productList/productList.page';
const routes: Routes = [
    {
        path: '', redirectTo: "/catalog/types", pathMatch: "full"
    },
    {
        path: "",
        component: CatalogPage,
        children: [
            { path: 'types', component: TypesPage },
            { path: 'productList', component: ProductListPage }
        ]
    }
];

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class CatalogRoutingModule { }