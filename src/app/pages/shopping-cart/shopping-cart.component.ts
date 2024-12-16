import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../interface/product.interface';
import { CartService } from '../../services/cart.service';
import { RouterModule } from '@angular/router';
import { EmptyCartComponent } from '../../components/empty-cart/empty-cart.component';
import { WishListService } from '../../services/favorite.service';
import { LitterProductCardComponent } from '../../shared/litter-product-card/litter-product-card.component';
import { HowWeWorkComponent } from '../../components/how-we-work/how-we-work.component';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    EmptyCartComponent,
    LitterProductCardComponent,
    HowWeWorkComponent,
  ],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.min.css',
})
export class ShoppingCartComponent implements OnInit {
  private cartService = inject(CartService);
  private wishlistService = inject(WishListService);

  public product_list: Product[] = [];
  public wishlist_list: Product[] = [];

  ngOnInit(): void {
    this.cartService.allProducts.subscribe(
      (list) => (this.product_list = list)
    );

    this.wishlistService.allProducts.subscribe(
      (list) => (this.wishlist_list = list)
    );
  }

  actionsOnCantToBy(id: string, cant: number) {
    this.cartService.actionsOnCantToBy(id, cant);
  }

  removeProductById(id: string) {
    this.cartService.removeProductById(id);
  }

  totalAmount(): string {
    return this.cartService.totalAmount();
  }

  cleanCart() {
    this.cartService.cleanCart();
  }
}
