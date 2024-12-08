import { Product } from '../../interface/product.interface';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { CartService } from '../../services/cart.service';
import { WishListService } from '../../services/favorite.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'product-card',
  standalone: true,
  templateUrl: './product-card.component.html',
  imports: [CommonModule, RouterLink],
  styleUrl: './product-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
  @Input() product!: Product;

  private wishlistS = inject(WishListService);

  private cartS = inject(CartService);

  onClick(product: Product) {
    this.cartS.actionsOnCart(product, 1);
  }

  addToFavorites() {
    this.wishlistS.actionsOnList(this.product);
  }

  isInCart(id: string): boolean {
    return this.cartS.isInCart(id);
  }
}
