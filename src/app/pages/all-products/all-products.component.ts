import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ProductManagerService } from '../../services/product-manager.service';
import { CartService } from '../../services/cart.service';
import { WishListService } from '../../services/favorite.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FiltersService } from '../../services/filters.service';
import { Product } from '../../interface/product.interface';
import { FiltersComponent } from '../../shared/filters/filters.component';

@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [FiltersComponent, RouterModule, CommonModule],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.css',
})
export class AllProductsComponent implements OnInit {
  private productM = inject(ProductManagerService);
  private wishlistS = inject(WishListService);
  private cartS = inject(CartService);
  private activateR = inject(ActivatedRoute);

  private filterService = inject(FiltersService);

  public product_list: Product[] = [];
  query_search: string | null = null;

  ngOnInit(): void {
    this.activateR.queryParams.subscribe((params) => {
      const query = params['query'];
      if (!query) {
        this.query_search = '';
        this.updateProductList();
      } else {
        this.query_search = query;
        this.productM.filterProducts(query);
        this.filterService.updateFilters({ name: query });
      }
    });

    this.productM.allProducts.subscribe((list) => {
      if (!this.query_search) {
        this.product_list = list;
      }
    });
  }

  updateProductList() {
    this.productM.allProducts.subscribe((list) => {
      this.product_list = list;
    });
  }

  onClick(span_id: number, product: Product) {
    const cant = document.getElementById(`cant_${span_id}`) as HTMLSpanElement;
    this.cartS.actionsOnCart(product, Number.parseInt(cant.textContent!));
  }

  addToFavorites(product: Product) {
    this.wishlistS.actionsOnList(product);
  }

  isInCart(id: string): boolean {
    return this.cartS.isInCart(id);
  }

  isInWishList(id: string): boolean {
    return this.wishlistS.isInList(id);
  }

  actionsOnCantToBy(span_id: string, cant: number) {
    const span = document.getElementById(span_id) as HTMLSpanElement;
    if (!span.textContent) return;

    const value = Number.parseInt(span.textContent);
    if (value + cant === 0) return;
    span.innerHTML = `${value + cant}`;
  }

  extractCantToByOfCart(prod_id: string): number {
    const cart = localStorage.getItem('shoppingCart');
    if (!cart) return 1;

    const parsed = JSON.parse(cart) as Product[];
    const productInCart = parsed.find((prod) => prod._id === prod_id);

    return productInCart ? productInCart.cantToBuy : 1;
  }

  resetFilters() {
    window.location.replace(window.location.pathname);
    this.productM.resetFilters();
    this.updateProductList();
  }
}
