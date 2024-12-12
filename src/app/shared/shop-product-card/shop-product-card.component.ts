import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnDestroy,
  PLATFORM_ID,
} from '@angular/core';
import { Product } from '../../interface/product.interface';
import { CartService } from '../../services/cart.service';
import { WishListService } from '../../services/favorite.service';
import { RouterLink } from '@angular/router';
import { ToastService } from '../../services/toast-service.service';

@Component({
  selector: 'shop-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './shop-product-card.component.html',
  styleUrl: './shop-product-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopProductCardComponent implements OnDestroy {
  @Input() index!: number;
  @Input() product!: Product;

  private platform = inject(PLATFORM_ID);

  private wishlistS = inject(WishListService);
  private cartS = inject(CartService);
  private toastService = inject(ToastService);

  onClick() {
    if (isPlatformBrowser(this.platform)) {
      const cant = document.getElementById(
        `cant_${this.index}`
      ) as HTMLSpanElement;
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
    this.wishlistS.actionsOnList(this.product);
    console.log(this.isInWishList());
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
    return this.cartS.isInCart(this.product._id);
  }

  isInWishList(): boolean {
    return this.wishlistS.isInList(this.product._id);
  }

  actionsOnCantToBy(span_id: string, cant: number) {
    if (isPlatformBrowser(this.platform)) {
      const span = document.getElementById(span_id) as HTMLSpanElement;
      if (!span.textContent) return;

      const value = Number.parseInt(span.textContent);
      if (value + cant === 0) return;
      span.innerHTML = `${value + cant}`;
    }
  }

  extractCantToByOfCart(prod_id: string): number {
    if (isPlatformBrowser(this.platform)) {
      const cart = localStorage.getItem('shoppingCart');
      if (!cart) return 1;

      const parsed = JSON.parse(cart) as Product[];
      const productInCart = parsed.find((prod) => prod._id === prod_id);

      return productInCart?.cantToBuy ?? 1;
    }
    return 1;
  }

  ngOnDestroy(): void {
    this.toastService.destroy();
  }
}
