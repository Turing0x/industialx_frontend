import { Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { ShopPageComponent } from './pages/shop-page/shop-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    title: 'Industrial X - Offering Solutions',
  },
  {
    path: 'shop',
    component: ShopPageComponent,
    title: 'Shop',
  },
  {
    path: 'about',
    component: AboutPageComponent,
    title: 'About',
  },
  {
    path: 'contact',
    component: ContactPageComponent,
    title: 'Contact',
  },
];
