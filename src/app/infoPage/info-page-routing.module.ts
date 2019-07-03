
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { InfoPage } from './info.page';
const routes: Routes = [
    {
        path: '', redirectTo: "/productInfo", pathMatch: "full"
    },
    {
        path: "",
        component: InfoPage
    }
];

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class InfoRoutingModule { }