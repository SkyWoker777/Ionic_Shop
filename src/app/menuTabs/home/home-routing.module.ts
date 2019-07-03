
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { HomePage } from './home.page';
import { CartPage } from './cart/cart.page';
import { AllProductsPage } from './allProducts/allProducts.page';
const routes: Routes = [
    {
        path: '', redirectTo: "/home/allProducts", pathMatch: "full"
    },
    {
        path: "",
        component: HomePage,
        children: [
            {
                path: 'allProducts', component: AllProductsPage
            },
            {
                path: 'cart', component: CartPage
            }
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
export class HomeRoutingModule { }