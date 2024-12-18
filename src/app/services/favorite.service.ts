import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../interface/product.interface';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class WishListService {
  private platform = inject(PLATFORM_ID);

  private wishlist: Product[] = [];
  private _products: BehaviorSubject<Product[]>;

  constructor() {
    this._products = new BehaviorSubject<Product[]>([]);
    this.loadListFromLocalStorage();
  }

  private loadListFromLocalStorage(): void {
    if (isPlatformBrowser(this.platform)) {
      const List = localStorage.getItem('wishlist');
      if (List) {
        this.wishlist = JSON.parse(List);
        this._products.next(this.wishlist);
      }
    }
  }

  private saveListToLocalStorage(): void {
    if (isPlatformBrowser(this.platform)) {
      localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
    }
  }

  get allProducts() {
    return this._products.asObservable();
  }

  isInList(id: string): boolean {
    return this.wishlist.some((prod) => prod._id === id);
  }

  actionsOnList(product: Product) {
    const some = this.wishlist.some((prod) => prod._id === product._id);
    if (!some) {
      const newProd: Product = { ...product, cantToBuy: 1 };
      this.wishlist.push(newProd);
    } else {
      this.wishlist = this.wishlist.filter((prod) => prod._id !== product._id);
    }
    this.saveListToLocalStorage();
    this._products.next(this.wishlist);
  }

  removeProductById(id: string) {
    this.wishlist = this.wishlist.filter((prod) => prod._id !== id);
    this.saveListToLocalStorage();
    this._products.next(this.wishlist);
  }

  cleanList() {
    this.wishlist = [];
    this.saveListToLocalStorage();
    this._products.next(this.wishlist);
  }

  lengthOfList(): number {
    return this.wishlist.length;
  }
}
