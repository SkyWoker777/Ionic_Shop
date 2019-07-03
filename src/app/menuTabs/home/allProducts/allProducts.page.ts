import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/shared/models/api-models/poduct.model';
import { ProductService } from 'src/app/services/product.service';
import { ModalController } from '@ionic/angular';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { MenuBookModel as MenuBookModel } from 'src/app/shared/models/client-models/menuBook.model';
import { MenuMagazineModel } from 'src/app/shared/models/client-models/menuMagazine.model';
import { Router } from '@angular/router';
import { PurchaseService } from 'src/app/services/purchase.service';
import { NewPurchaseItemModel } from 'src/app/shared/models/client-models/newPurchaseItem.model';
import { ProductType } from 'src/app/shared/models/api-models/cart/purchaseItem.model';
import { InfoPage } from 'src/app/infoPage/info.page';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-allProducts',
  templateUrl: 'allProducts.page.html',
  styleUrls: ['allProducts.page.scss'],
})
export class AllProductsPage implements OnInit {
  public productsArray: Array<any>;
  public isUserLoggedIn: boolean;
  public countOfItemsInCart: number = 0;

  constructor(private readonly productService: ProductService, private readonly modalController: ModalController,
    private readonly nativePageTransitions: NativePageTransitions, private readonly router: Router,
    private readonly purchaseService: PurchaseService, private readonly toastService: ToastService,
    private readonly authService: AuthService) {
  }

  ngOnInit(): void {
    this.purchaseService.countOfPurchases.subscribe(number => {
      this.countOfItemsInCart = number;
    });

    this.authService.user.subscribe(val => {
      this.isUserLoggedIn = val != null;
    });

    this.productService.getAll().subscribe((data: ProductModel) => {
      this.productsArray = new Array();
      data.books.forEach(element => {
        let book = new MenuBookModel();
        book.id = element.id;
        book.name = element.name;
        book.authors = element.authors;
        book.description = element.description;
        book.category = element.category;
        book.price = element.price;
        book.type = 'book';
        this.productsArray.push(book);
      });
      data.magazines.forEach(element => {
        let magazine = new MenuMagazineModel();
        magazine.id = element.id;
        magazine.name = element.name;
        magazine.publisher = element.publisher;
        magazine.price = element.price;
        magazine.category = element.category;
        magazine.type = 'magazine';
        this.productsArray.push(magazine);
      });
      this.shuffle(this.productsArray);
    });
  }

  private shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  public async goToInfo(id: string, type: string) {
    let options: NativeTransitionOptions = {
      direction: 'up',
      duration: 400,
      slowdownfactor: -1,
      iosdelay: 50
    };
    this.nativePageTransitions.slide(options);
    const modal = await this.modalController.create({
      component: InfoPage,
      componentProps: { id: id, type: type, hideBuyButton: false },
      keyboardClose: true
    });
    return await modal.present();
  }

  public showCart() {
    this.router.navigate(['home/cart']);
  }

  public async addToCart(product: any) {
    
      if (!this.isUserLoggedIn) {
        await this.toastService.showErrorToast('You can not use the cart without being logged in', 'Ok');
        return;
      }

      let purchase = new NewPurchaseItemModel();
      purchase.name = product.name;
      purchase.userId = this.authService.CurrentUser.id;
      purchase.productId = product.id;
      purchase.qty = 1;
      purchase.type = (product.type === 'book') ? ProductType.BOOK : ProductType.MAGAZINE;
      purchase.costsPerOne = product.price;

      this.purchaseService.createPurchase(purchase).subscribe(async (data: boolean) => {
        this.purchaseService.CurrentCountOfPurchases += 1;
        await this.toastService.showSuccessToast('Item added to cart', 'Got it!');
      });
  }

}
