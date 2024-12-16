import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'landing-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.min.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}
