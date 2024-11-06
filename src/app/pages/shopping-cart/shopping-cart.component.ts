import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../interface/product.interface';
import { CartService } from '../../services/cart.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css',
})
export class ShoppingCartComponent implements OnInit {
  public product_list: Product[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.allProducts.subscribe(
      (list) => (this.product_list = list)
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
