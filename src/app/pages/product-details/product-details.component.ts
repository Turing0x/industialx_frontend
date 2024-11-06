import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { WishListService } from '../../services/favorite.service';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interface/product.interface';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  private activateRoute = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private wishlistS = inject(WishListService);
  private cartS = inject(CartService);

  public product!: Product | undefined;

  ngOnInit(): void {
    this.activateRoute.queryParams.subscribe((params) => {
      this.productService.getProductById(params['id']).subscribe((prod) => {
        const aux = { ...prod, cantToBuy: 1 };
        this.product = aux;
      });
    });
  }

  onClick() {
    const cant = document.getElementById('cant') as HTMLSpanElement;
    if (!this.product) return;
    this.cartS.actionsOnCart(this.product, Number.parseInt(cant.textContent!));
  }

  addToFavorites() {
    if (!this.product) return;
    this.wishlistS.actionsOnList(this.product);
  }

  isInCart(): boolean {
    if (!this.product) return false;
    return this.cartS.isInCart(this.product._id);
  }

  isInWishList(): boolean {
    if (!this.product) return false;
    return this.wishlistS.isInList(this.product._id);
  }

  actionsOnCantToBy(cant: number) {
    const span = document.getElementById('cant') as HTMLSpanElement;
    if (!span.textContent) return;

    const value = Number.parseInt(span.textContent);
    if (value + cant === 0) return;
    span.innerHTML = `${value + cant}`;
  }

  goBack() {
    window.history.back();
  }
}
