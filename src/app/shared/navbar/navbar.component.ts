import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Product } from '../../interface/product.interface';
import { CartService } from '../../services/cart.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'shared-navbar',
  standalone: true,
  imports: [RouterLinkActive, RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {
  private cd = inject(ChangeDetectorRef);
  private platform = inject(PLATFORM_ID);

  private cartService = inject(CartService);

  public prods_in_cart: Product[] = [];

  ngOnInit(): void {
    this.cartService.allProducts.subscribe((prods) => {
      this.prods_in_cart = prods;
      this.cd.detectChanges();
    });
  }

  removeProductById(id: string) {
    this.cartService.removeProductById(id);
  }

  totalAmount(): string {
    return this.cartService.totalAmount();
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
}
