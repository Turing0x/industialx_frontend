import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'empty-cart',
  standalone: true,
  imports: [],
  templateUrl: './empty-cart.component.html',
  styleUrl: './empty-cart.component.min.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    style: 'width: 75%;',
  },
})
export class EmptyCartComponent {}
