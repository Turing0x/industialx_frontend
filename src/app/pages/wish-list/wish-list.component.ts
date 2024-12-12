import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  OnInit,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { WishListService } from '../../services/favorite.service';
import { CartService } from '../../services/cart.service';
import { RouterModule } from '@angular/router';
import { Product } from '../../interface/product.interface';
import { HowWeWorkComponent } from '../../components/how-we-work/how-we-work.component';

@Component({
  selector: 'app-whish-list',
  standalone: true,
  imports: [RouterModule, CommonModule, HowWeWorkComponent],

  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.css',
})
export class WishListComponent implements OnInit {
  private platform = inject(PLATFORM_ID);
  private cd = inject(ChangeDetectorRef);

  private wishlistS = inject(WishListService);
  private cartS = inject(CartService);

  public product_list: Product[] = [];

  ngOnInit(): void {
    this.wishlistS.allProducts.subscribe((list) => {
      this.product_list = list;
      this.cd.detectChanges();
    });
  }

  onClick(product: Product) {
    this.cartS.actionsOnCart(product, product.cantToBuy!);
  }

  removeToFavorites(id: string) {
    this.wishlistS.removeProductById(id);
  }

  actionsOnCantToBy(id: string, cant: number) {
    if (cant === 0) return;
    const prod = this.product_list.find((product) => product._id === id);
    if (!prod) return;

    prod.cantToBuy = cant + prod.cantToBuy!;

    this.cd.detectChanges();
  }
}
