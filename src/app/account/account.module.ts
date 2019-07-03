import { NgModule } from "@angular/core";
import { AccountPage } from './account.page';
import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LogInPage } from './login/login.page';
import { RegisterPage } from './register/register.page';

@NgModule({
    declarations: [AccountPage, LogInPage, RegisterPage],
    imports: [
        AccountRoutingModule,
        SharedModule
    ]

})
export class AccountModule {

}