import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'shared-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  public pageLinks = [
    {
      title: 'Links',
      href: [
        {
          title: 'Home',
          link: '/',
        },
        {
          title: 'Shop',
          link: '/shop',
        },
        {
          title: 'About',
          link: '/about',
        },
        {
          title: 'Contact',
          link: '/contact',
        },
      ],
    },
    {
      title: 'Help',
      href: [
        {
          title: 'Payments Options',
          link: '/payments',
        },
        {
          title: 'Returns & Exchanges',
          link: '/returns',
        },
        {
          title: 'Privacy Policy',
          link: '/privacy',
        },
      ],
    },
  ];
}
