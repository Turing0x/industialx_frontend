import { Product } from '../../interface/product.interface';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  PLATFORM_ID,
} from '@angular/core';
import { AddBtnComponent } from '../add-btn/add-btn.component';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'product-card',
  standalone: true,
  imports: [CommonModule, AddBtnComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
  @Input() product!: Product;

  private cartS = inject(CartService);

  onClick(product: Product) {
    this.cartS.actionsOnCart(product, 1);
  }

  isInCart(id: string): boolean {
    return this.cartS.isInCart(id);
  }
}
