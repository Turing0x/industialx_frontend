import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { WishListService } from '../../services/favorite.service';
import { CartService } from '../../services/cart.service';
import { RouterModule } from '@angular/router';
import { Product } from '../../interface/product.interface';

@Component({
  selector: 'app-whish-list',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.css',
})
export class WishListComponent implements OnInit {
  public product_list: Product[] = [];

  private wishlistS = inject(WishListService);
  private cartS = inject(CartService);

  ngOnInit(): void {
    this.wishlistS.allProducts.subscribe((list) => (this.product_list = list));
  }

  onClick(span_id: number, product: Product) {
    const cant = document.getElementById(`cant_${span_id}`) as HTMLSpanElement;
    this.cartS.actionsOnCart(product, Number.parseInt(cant.textContent!));
  }

  removeToFavorites(id: string) {
    this.wishlistS.removeProductById(id);
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
}
