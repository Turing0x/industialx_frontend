import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { ProductManagerService } from '../../services/product-manager.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FiltersService } from '../../services/filters.service';
import { Product } from '../../interface/product.interface';
import { FiltersComponent } from '../../shared/filters/filters.component';
import { ShopProductCardComponent } from '../../shared/shop-product-card/shop-product-card.component';

@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [
    FiltersComponent,
    RouterModule,
    CommonModule,
    ShopProductCardComponent,
  ],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.css',
})
export class AllProductsComponent implements OnInit {
  private platform = inject(PLATFORM_ID);
  private activateR = inject(ActivatedRoute);

  private productM = inject(ProductManagerService);
  private filterService = inject(FiltersService);

  public product_list: Product[] = [];
  public query_search: string | null = null;

  ngOnInit(): void {
    this.updateProductList();
  }

  updateProductList() {
    this.productM.allProducts.subscribe((list) => {
      this.product_list = list;
    });
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

  resetFilters() {
    if (isPlatformBrowser(this.platform)) {
      window.location.replace(window.location.pathname);
      this.productM.resetFilters();
      this.updateProductList();
    }
  }
}
