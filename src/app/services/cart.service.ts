import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../interface/product.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private shoppingCart: Product[] = [];
  private _products: BehaviorSubject<Product[]>;

  constructor() {
    this._products = new BehaviorSubject<Product[]>([]);
    this.loadCartFromLocalStorage();
  }

  private loadCartFromLocalStorage(): void {
    const cart = localStorage.getItem('shoppingCart');
    if (cart) {
      this.shoppingCart = JSON.parse(cart);
      this._products.next(this.shoppingCart);
    }
  }

  private saveCartToLocalStorage(): void {
    localStorage.setItem('shoppingCart', JSON.stringify(this.shoppingCart));
  }

  get allProducts() {
    return this._products.asObservable();
  }

  isInCart(id: string): boolean {
    return this.shoppingCart.some((prod) => prod._id === id);
  }

  actionsOnCart(product: Product, cant?: number) {
    const some = this.shoppingCart.some((prod) => prod._id === product._id);
    if (!some) {
      const newProd: Product = { ...product, cantToBuy: cant ?? 1 };
      this.shoppingCart.push(newProd);
    } else {
      this.shoppingCart = this.shoppingCart.filter(
        (prod) => prod._id !== product._id
      );
    }
    this.saveCartToLocalStorage();
    this._products.next(this.shoppingCart);
  }

  actionsOnCantToBy(id: string, cant: number) {
    this.shoppingCart.find((product) => {
      if (product._id === id) {
        if (product.cantToBuy === 1 && cant === -1) return;
        product.cantToBuy += cant;
      }
    });
    this.saveCartToLocalStorage();
    this._products.next(this.shoppingCart);
  }

  totalAmount(): string {
    return this.shoppingCart
      .reduce((prev, curr) => prev + curr.price * curr.cantToBuy, 0)
      .toFixed(2);
  }

  removeProductById(id: string) {
    this.shoppingCart = this.shoppingCart.filter((prod) => prod._id !== id);
    this.saveCartToLocalStorage();
    this._products.next(this.shoppingCart);
  }

  cleanCart() {
    this.shoppingCart = [];
    this.saveCartToLocalStorage();
    this._products.next(this.shoppingCart);
  }

  lengthOfCart(): number {
    return this.shoppingCart.length;
  }
}
