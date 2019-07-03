import { Component } from "@angular/core";
import { MenuController } from '@ionic/angular';


@Component({
    selector: 'account',
    templateUrl: './account.page.html'
})
export class AccountPage{
    constructor(public menuCtrl:MenuController) {
        this.menuCtrl.enable(false);
    }
}