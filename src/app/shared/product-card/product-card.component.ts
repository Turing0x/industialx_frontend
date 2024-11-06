import { Product } from './../../interface/Product';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AddBtnComponent } from '../add-btn/add-btn.component';

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
}
