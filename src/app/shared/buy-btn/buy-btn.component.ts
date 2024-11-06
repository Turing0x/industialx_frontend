import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'buy-btn',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './buy-btn.component.html',
  styleUrl: './buy-btn.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuyBtnComponent {}
