import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Product } from '../../interface/product.interface';
import { ProductCardComponent } from '../../shared/product-card/product-card.component';
import { AddBtnComponent } from '../../shared/add-btn/add-btn.component';
import { ProductService } from '../../services/product.service';
import { SubtitleComponent } from '../subtitle/subtitle.component';

@Component({
  selector: 'landing-offers',
  standalone: true,
  imports: [
    CommonModule,
    ProductCardComponent,
    AddBtnComponent,
    SubtitleComponent,
  ],
  templateUrl: './offers.component.html',
  styleUrl: './offers.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OffersComponent implements OnInit {
  private cd = inject(ChangeDetectorRef);

  private productService = inject(ProductService);
  public products: Product[] = [];

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((products) => {
      this.products = products.filter((product) => product.offer > 0);
      this.cd.markForCheck();
    });
  }
}
