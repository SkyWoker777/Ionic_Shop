import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {Location} from '@angular/common';
import { PurchaseItemModel } from 'src/app/shared/models/api-models/cart/purchaseItem.model';
import { PurchaseService } from 'src/app/services/purchase.service';
import { CartItemModel } from 'src/app/shared/models/api-models/cart/cartItem.model';
import { NativeTransitionOptions, NativePageTransitions } from '@ionic-native/native-page-transitions/ngx';
import { ModalController } from '@ionic/angular';
import { InfoPage } from 'src/app/infoPage/info.page';
import { PopupService } from 'src/app/services/popup.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: 'cart.page.html',
  styleUrls: ['cart.page.scss'],
})
export class CartPage implements OnInit {

  public purchasesArray: Array<CartItemModel>;
  public isLoading: boolean = false;

  constructor(private _location: Location, private readonly authService: AuthService, private readonly purchaseService: PurchaseService,
    private readonly nativePageTransitions: NativePageTransitions, private readonly modalController: ModalController,
    private changeDetectorRefs: ChangeDetectorRef, private readonly popupService: PopupService) {
  }

  public ngOnInit(): void {
      if (!this.authService.CurrentUser)
      {
        return;
      }
      this.purchaseService.getPurchaseByUserId(this.authService.CurrentUser.id).subscribe((result: PurchaseItemModel[]) => {
        this.purchasesArray = new Array<CartItemModel>();

        result.forEach(value => {
          let cartItem = new CartItemModel();
          cartItem.id = value.id;
          cartItem.name = value.name;
          cartItem.creationDate = value.creationDate;
          cartItem.userId = value.userId;
          cartItem.productId = value.productId;
          cartItem.qty = value.qty;
          cartItem.type = value.type;
          cartItem.costsPerOne = value.costsPerOne;
          cartItem.isChecked = false;

          this.purchasesArray.push(cartItem);
        });
      });
    
  }

  public goBack() {
    this._location.back();
  }

  public deleteItems() {
    this.popupService.presentAlertConfirm('delete items from the basket', ()=> {
      let selectedArray = this.purchasesArray.filter(purchase => purchase.isChecked == true);
      selectedArray.forEach(item => {
        this.purchaseService.deletePurchase(item.id).subscribe(async res => {
          this.isLoading = true;
          let index: number = this.purchasesArray.findIndex(purchase => purchase.id === item.id);
          this.purchasesArray.splice(index, 1);
          let newArray = this.purchasesArray;
          this.purchasesArray = new Array<CartItemModel>();
          this.purchasesArray = newArray;
          this.changeDetectorRefs.detectChanges();
          this.purchaseService.CurrentCountOfPurchases -= item.qty;
          this.isLoading = false;
         });
      });
    });
  }

  public buyItems() {

  }

  public async aboutItem(purchase: CartItemModel) {
    let options: NativeTransitionOptions = {
      direction: 'up',
      duration: 400,
      slowdownfactor: -1,
      iosdelay: 50
    };
    this.nativePageTransitions.slide(options);
    const modal = await this.modalController.create({
      component: InfoPage,
      componentProps: { id: purchase.productId, type: purchase.type, hideBuyButton: true },
      keyboardClose: true
    });
    return await modal.present();
  }
}