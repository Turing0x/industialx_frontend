import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Product } from '../../interface/product.interface';
import { ProductCardComponent } from '../../shared/product-card/product-card.component';
import { AddBtnComponent } from '../../shared/add-btn/add-btn.component';

@Component({
  selector: 'landing-offers',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, AddBtnComponent],
  templateUrl: './offers.component.html',
  styleUrl: './offers.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OffersComponent {
  public products: Product[] = [
    {
      id: '1',
      title: 'Syltherine',
      description:
        'Elegant dining chair with curved backrest and plush cushioning',
      price: 100,
      image: '/images/range1.webp',
      offer: 30,
    },
    {
      id: '2',
      title: 'Leviosa',
      description: 'Stylish armchair with a sleek design and soft cushioning',
      price: 200,
      image: '/images/range2.webp',
      offer: 25,
    },
    {
      id: '3',
      title: 'Lolito',
      description:
        'Contemporary bedroom set featuring a platform bed and matching nightstands',
      price: 150,
      image: '/images/range3.webp',
      offer: 40,
    },
    {
      id: '4',
      title: 'Respira',
      description:
        'Elegant dining table with a glass top and a solid wood base',
      price: 300,
      image: '/images/range1.webp',
      offer: 20,
    },
    {
      id: '5',
      title: 'Grifo',
      description:
        'Stylish sofa with a modern design and comfortable cushioning',
      price: 250,
      image: '/images/range2.webp',
      offer: 35,
    },
    {
      id: '6',
      title: 'Muggo',
      description:
        'Stylish coffee table with a glass top and a solid wood base',
      price: 175,
      image: '/images/range3.webp',
      offer: 45,
    },
    {
      id: '7',
      title: 'Pingky',
      description: 'Cute and cozy bean bag chair with a soft cushioning',
      price: 225,
      image: '/images/range1.webp',
      offer: 15,
    },
    {
      id: '8',
      title: 'Potty',
      description: 'Monimalist table with a glass top and a solid wood base',
      price: 140,
      image: '/images/range2.webp',
      offer: 50,
    },
  ];
}
