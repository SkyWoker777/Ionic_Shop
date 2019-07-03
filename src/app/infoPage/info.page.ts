import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { BookService } from 'src/app/services/book.service';
import { MagazineService } from 'src/app/services/magazine.service';
import { PurchaseService } from 'src/app/services/purchase.service';
import { Storage } from '@ionic/storage';
import { NewPurchaseItemModel } from 'src/app/shared/models/client-models/newPurchaseItem.model';
import { ProductType } from 'src/app/shared/models/api-models/cart/purchaseItem.model';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-info',
  templateUrl: 'info.page.html',
  styleUrls: ['info.page.scss'],
})
export class InfoPage implements OnInit {

  public product: any;
  public type: string;
  public hideBuyButton: boolean;

  constructor(private readonly modalController: ModalController, private readonly navParams: NavParams,
    private readonly bookService: BookService, private readonly magazineService: MagazineService,
    private readonly purchaseService: PurchaseService, private readonly toastService: ToastService,
    private readonly storage: Storage) {
      this.hideBuyButton = this.navParams.data.hideBuyButton;
      switch (this.navParams.data.type) {
        case 'book':
          {
            this.bookService.getBookById(this.navParams.data.id).subscribe(data => {
              this.product = data;
              this.type = 'book';
            });
            break;
          }
        case 'magazine':
          {
            this.magazineService.getMagazineById(this.navParams.data.id).subscribe(data => {
              this.product = data;
              this.type = 'magazine';
            });
            break;
          }
      }
  }

  public ngOnInit(): void {

  }

  public close() {
    this.modalController.dismiss();
  }

  public async addToCart() {
    this.storage.get('local-user').then(async user => {
      if (!user) {
        await this.toastService.showErrorToast('You can not use the cart without being logged in', 'Ok');
        return;
      }

      let purchase = new NewPurchaseItemModel();
      purchase.name = this.product.name;
      purchase.userId = user.id;
      purchase.productId = this.product.id;
      purchase.qty = 1;
      purchase.type = (this.type === 'book') ? ProductType.BOOK : ProductType.MAGAZINE;
      purchase.costsPerOne = this.product.price;

      this.purchaseService.createPurchase(purchase).subscribe(async (data: boolean) => {
        this.purchaseService.CurrentCountOfPurchases += 1;
        await this.toastService.showSuccessToast('Item added to cart', 'Got it!');
      });
    });
  }
}
