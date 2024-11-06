import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-shop-page',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './shop-page.component.html',
  styleUrl: './shop-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopPageComponent { }
