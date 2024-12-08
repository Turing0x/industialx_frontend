import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'subtitle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subtitle.component.html',
  styleUrl: './subtitle.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubtitleComponent {
  @Input({ required: true }) text!: string;
}
