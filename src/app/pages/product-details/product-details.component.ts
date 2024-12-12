import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { WishListService } from '../../services/favorite.service';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interface/product.interface';
import { RelatedProductsComponent } from '../../components/related-products/related-products.component';
import { ToastNotificationComponent } from '../../shared/toast-notification/toast-notification.component';
import { ToastService } from '../../services/toast-service.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RelatedProductsComponent,
    ToastNotificationComponent,
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  private toastService = inject(ToastService);
  private activateRoute = inject(ActivatedRoute);
  private platform = inject(PLATFORM_ID);

  private productService = inject(ProductService);
  private wishlistS = inject(WishListService);
  private cartS = inject(CartService);

  public product!: Product | undefined;

  ngOnInit(): void {
    this.activateRoute.params.subscribe(({ id }) => {
      this.productService.getProductById(id).subscribe((prod) => {
        const aux = { ...prod, cantToBuy: 1 };
        this.product = aux;
      });
    });
  }

  onClick() {
    if (isPlatformBrowser(this.platform)) {
      const cant = document.getElementById('cant') as HTMLSpanElement;
      if (!this.product) return;
      this.cartS.actionsOnCart(
        this.product,
        Number.parseInt(cant.textContent!)
      );

      if (this.isInCart()) {
        this.toastService.showToast(
          `El producto ha sido agregado al carrito`,
          'success'
        );
      } else {
        this.toastService.showToast(
          `El producto ha sido eliminado del carrito`,
          'error'
        );
      }
    }
  }

  addToFavorites() {
    if (!this.product) return;
    this.wishlistS.actionsOnList(this.product);
    if (this.isInWishList()) {
      this.toastService.showToast(
        `El producto ha sido agregado a favoritos`,
        'success'
      );
    } else {
      this.toastService.showToast(
        `El producto ha sido eliminado de favoritos`,
        'error'
      );
    }
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
    if (isPlatformBrowser(this.platform)) {
      const span = document.getElementById('cant') as HTMLSpanElement;
      if (!span.textContent) return;

      const value = Number.parseInt(span.textContent);
      if (value + cant === 0) return;
      span.innerHTML = `${value + cant}`;
    }
  }
}
