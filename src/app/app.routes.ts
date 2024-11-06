import { Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { AllProductsComponent } from './pages/all-products/all-products.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { WishListComponent } from './pages/wish-list/wish-list.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    title: 'Industrial X | Offering Solutions',
  },
  {
    path: 'shop',
    component: AllProductsComponent,
    title: 'Shop | Industrial X',
  },
  {
    path: 'shop/:id',
    component: ProductDetailsComponent,
    title: 'Product | Industrial X',
  },
  {
    path: 'cart',
    component: ShoppingCartComponent,
    title: 'Cart | Industrial X',
  },
  {
    path: 'wishlist',
    component: WishListComponent,
    title: 'Wishlist | Industrial X',
  },
  {
    path: 'profile',
    component: ProfilePageComponent,
    title: 'Profile | Industrial X',
  },
  {
    path: 'about',
    component: AboutPageComponent,
    title: 'About | Industrial X',
  },
  {
    path: 'contact',
    component: ContactPageComponent,
    title: 'Contact | Industrial X',
  },
];
