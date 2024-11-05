import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLinkActive } from '@angular/router';

@Component({
  selector: 'shared-navbar',
  standalone: true,
  imports: [RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {}
