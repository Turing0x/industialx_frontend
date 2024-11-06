import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'add-btn',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-btn.component.html',
  styleUrl: './add-btn.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddBtnComponent {
  @Input() productId!: string;
  @Input() yellow!: boolean;
}
