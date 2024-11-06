import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../interface/product.interface';

@Injectable({
  providedIn: 'root',
})
export class WishListService {
  private wishlist: Product[] = [];
  private _products: BehaviorSubject<Product[]>;

  constructor() {
    this._products = new BehaviorSubject<Product[]>([]);
    this.loadListFromLocalStorage();
  }

  private loadListFromLocalStorage(): void {
    const List = localStorage.getItem('wishlist');
    if (List) {
      this.wishlist = JSON.parse(List);
      this._products.next(this.wishlist);
    }
  }

  private saveListToLocalStorage(): void {
    localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
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
      this.wishlist.push(product);
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
