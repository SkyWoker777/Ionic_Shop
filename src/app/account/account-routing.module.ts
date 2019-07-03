
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { AccountPage } from './account.page';
import { LogInPage } from './login/login.page';
import { RegisterPage } from './register/register.page';

const routes: Routes = [
    {
        path: '', redirectTo: "/account/login", pathMatch: "full"
    },
    {
        path: "",
        component: AccountPage,
        children: [
            {
                path: 'login', component: LogInPage
            },
            {
                path: 'register', component: RegisterPage
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
export class AccountRoutingModule { }
