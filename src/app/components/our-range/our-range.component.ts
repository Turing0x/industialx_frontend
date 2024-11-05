import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'landing-our-range',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './our-range.component.html',
  styleUrl: './our-range.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OurRangeComponent {}
