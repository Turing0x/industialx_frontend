import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  OnInit,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { ProductManagerService } from '../../services/product-manager.service';
import { RouterModule } from '@angular/router';
import { Product } from '../../interface/product.interface';
import { FiltersComponent } from '../../shared/filters/filters.component';
import { ShopProductCardComponent } from '../../shared/shop-product-card/shop-product-card.component';
import { SubtitleComponent } from '../../components/subtitle/subtitle.component';

@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [
    FiltersComponent,
    RouterModule,
    CommonModule,
    ShopProductCardComponent,
    SubtitleComponent,
  ],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.css',
})
export class AllProductsComponent implements OnInit {
  private platform = inject(PLATFORM_ID);
  private cd = inject(ChangeDetectorRef);

  private productM = inject(ProductManagerService);

  public product_list!: [Product[]];
  public query_search: string | null = null;

  public currentPage: number = 0;

  ngOnInit(): void {
    this.updateProductList();
  }

  updateProductList() {
    this.productM.allProducts.subscribe((list) => {
      const paginatedList: [Product[]] = [[]];
      for (let i = 0; i < list.length; i += 20) {
        paginatedList.push(list.slice(i, i + 20));
      }

      paginatedList.shift();
      this.product_list = paginatedList;
    });
  }

  changeCurrentPage(page: number) {
    this.currentPage = page;
  }

  getTotalLenght(): number {
    let total = 0;
    this.product_list.forEach((list) => {
      total += list.length;
    });

    return total;
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
