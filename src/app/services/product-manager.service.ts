import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ProductService } from './product.service';
import { FiltersService } from './filters.service';
import { Product } from '../interface/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductManagerService {
  private productS = inject(ProductService);
  private filtersService = inject(FiltersService);

  private product_list: Product[] = [];
  private _products = new BehaviorSubject<Product[]>([]);

  constructor() {
    this.productS.getAllProducts().subscribe((list) => {
      const aux = list.map((each_prod) => {
        const new_prod: Product = { ...each_prod, cantToBuy: 1 };
        return new_prod;
      });
      this.product_list = aux;
      this._products.next(aux);
    });

    this.filtersService.filters$.subscribe((filters) => {
      this.filterProducts(filters.name);
    });
  }

  get allProducts() {
    return this._products.asObservable();
  }

  get exhProducts() {
    return this._products.asObservable();
  }

  getProductById(produ_id: string): Observable<Product> {
    return of(this.product_list.find((product) => product._id === produ_id)!);
  }

  filterProducts(name?: string) {
    let filteredProducts = this.product_list;

    if (name) {
      const regex = new RegExp(name, 'i');
      filteredProducts = filteredProducts.filter((product) =>
        product.name.match(regex)
      );
    }

    this._products.next(filteredProducts);
  }

  sortProducts(order: string) {
    let sortedProducts = [...this.product_list];

    sortedProducts.sort((a, b) => {
      if (order === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });

    this._products.next(sortedProducts);
  }

  actionsOnCart(product: Product) {
    const some = this.product_list.some((prod) => prod._id === product._id);
    if (!some) {
      const newProd: Product = { ...product, cantToBuy: 1 };
      this.product_list.push(newProd);
    } else {
      this.product_list = this.product_list.filter(
        (prod) => prod._id !== product._id
      );
    }
    this._products.next(this.product_list);
  }

  resetFilters() {
    this._products.next(this.product_list);
  }
}
