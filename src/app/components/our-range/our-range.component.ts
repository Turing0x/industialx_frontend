import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SubtitleComponent } from '../subtitle/subtitle.component';

@Component({
  selector: 'landing-our-range',
  standalone: true,
  imports: [CommonModule, SubtitleComponent],
  templateUrl: './our-range.component.html',
  styleUrl: './our-range.component.min.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OurRangeComponent {}
