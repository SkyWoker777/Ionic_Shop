import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-types',
  templateUrl: 'types.page.html',
  styleUrls: ['types.page.scss'],
})
export class TypesPage implements OnInit {
  public productsTypesArray: Map<string, string>;

  constructor(private _location: Location, private readonly router: Router) {
  }

  ngOnInit(): void {
    this.productsTypesArray = new Map();
    this.productsTypesArray.set('books', "../assets/images/open-book.svg");
    this.productsTypesArray.set('magazines', "../assets/images/magazine.svg");
  }

  public goBack() {
    this._location.back();
  }

  public goToTypeList(type: string) {
    this.router.navigate(['/catalog/productList'], {queryParams: {type: type}});
  }

}
