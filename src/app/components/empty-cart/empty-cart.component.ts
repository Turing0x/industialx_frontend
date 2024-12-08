import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'empty-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './empty-cart.component.html',
  styleUrl: './empty-cart.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyCartComponent {}
