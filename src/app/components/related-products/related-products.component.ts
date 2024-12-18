import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { Product } from '../../interface/product.interface';
import { ProductService } from '../../services/product.service';
import { AddBtnComponent } from '../../shared/add-btn/add-btn.component';
import { ShopProductCardComponent } from '../../shared/shop-product-card/shop-product-card.component';

@Component({
  selector: 'app-related-products',
  standalone: true,
  imports: [ShopProductCardComponent, AddBtnComponent],
  templateUrl: './related-products.component.html',
  styleUrl: './related-products.component.min.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RelatedProductsComponent implements OnInit {
  @Input({ required: true }) category!: string;

  private cd = inject(ChangeDetectorRef);

  private productService = inject(ProductService);
  public products: Product[] = [];

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((products) => {
      this.products = products
        .filter((product) => product.offer > 0)
        .slice(0, 4);
      this.cd.detectChanges();
    });
  }
}
