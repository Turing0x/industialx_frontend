import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BuyBtnComponent } from '../../shared/buy-btn/buy-btn.component';

@Component({
  selector: 'landing-most-wanted',
  standalone: true,
  imports: [CommonModule, BuyBtnComponent],
  templateUrl: './most-wanted.component.html',
  styleUrl: './most-wanted.component.min.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MostWantedComponent {}
