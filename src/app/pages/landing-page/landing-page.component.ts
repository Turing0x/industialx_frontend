import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { OurRangeComponent } from '../../components/our-range/our-range.component';
import { OffersComponent } from '../../components/offers/offers.component';
import { MostWantedComponent } from '../../components/most-wanted/most-wanted.component';
import { ToastNotificationComponent } from '../../shared/toast-notification/toast-notification.component';

@Component({
  selector: 'landing-page',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    OurRangeComponent,
    OffersComponent,
    MostWantedComponent,
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.min.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent {}
