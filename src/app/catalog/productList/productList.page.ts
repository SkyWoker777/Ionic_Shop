import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NativeTransitionOptions, NativePageTransitions } from '@ionic-native/native-page-transitions/ngx';
import { ModalController } from '@ionic/angular';
import { PurchaseService } from 'src/app/services/purchase.service';
import { NewPurchaseItemModel } from 'src/app/shared/models/client-models/newPurchaseItem.model';
import { ProductType } from 'src/app/shared/models/api-models/cart/purchaseItem.model';
import { BookService } from 'src/app/services/book.service';
import { MagazineService } from 'src/app/services/magazine.service';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { InfoPage } from 'src/app/infoPage/info.page';
import { ToastService } from 'src/app/services/toast.service';

@Component({
    selector: 'app-productList',
    templateUrl: 'productList.page.html',
    styleUrls: ['productList.page.scss'],
})
export class ProductListPage implements OnInit {
    public productsArray: Array<any>;
    public type: string;

    constructor(private readonly purchaseService: PurchaseService, private readonly bookService: BookService, private readonly magazineService: MagazineService,
        private _location: Location, private readonly modalController: ModalController,
        private readonly nativePageTransitions: NativePageTransitions, private route: ActivatedRoute,
        private readonly toastService: ToastService, private readonly storage: Storage) {
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            let type = params['type'];

            switch (type.toLowerCase()) {
                case 'books':
                    {
                        this.getBooks(type);
                        break;
                    }
                case 'magazines':
                    {
                        this.getMagazines(type);
                        break;
                    }
            }
        });
    }

    public goBack() {
        this._location.back();
    }

    public async goToInfo(id: string) {
        let type = (this.type.toLowerCase() == "books") ? 'book' : 'magazine'; 
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

    public addToCart(product: any) {
        this.storage.get('local-user').then(async user => {
            if (!user) {
                await this,this.toastService.showErrorToast('You can not use the cart without being logged in', 'Ok');
                return;
            }

            let purchase = new NewPurchaseItemModel();
            purchase.name = product.name;
            purchase.userId = user.id;
            purchase.productId = product.id;
            purchase.qty = 1; 
            purchase.type = (this.type.toLowerCase() === 'books') ? ProductType.BOOK : ProductType.MAGAZINE;
            purchase.costsPerOne = product.price;

            this.purchaseService.createPurchase(purchase).subscribe(async (data: boolean) => {
                this.purchaseService.CurrentCountOfPurchases += 1;
                await this,this.toastService.showErrorToast('Item added to cart', 'Got it!');
            });
        });
    }

    private getBooks(type: string) {
        this.bookService.getAllBooks().subscribe(val => {
            this.type = type;
            this.productsArray = val;
        });
    }

    private getMagazines(type: string) {
        this.magazineService.getAllMagazines().subscribe(val => {
            this.type = type;
            this.productsArray = val;
        });
    }
}