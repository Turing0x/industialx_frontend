import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'how-we-work',
  standalone: true,
  imports: [],
  templateUrl: './how-we-work.component.html',
  styleUrl: './how-we-work.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class HowWeWorkComponent {
  public info_texts: { icon: string; title: string; subtitle: string }[] = [
    {
      icon: 'trophy.svg',
      title: 'High Quality',
      subtitle: 'crafted from top materials',
    },
    {
      icon: 'done.svg',
      title: 'Warranty Protection',
      subtitle: 'Over 2 years',
    },
    {
      icon: 'delivery.svg',
      title: 'Free Shipping',
      subtitle: 'Order over 150$',
    },
    {
      icon: 'support.svg',
      title: '24/7 Support',
      subtitle: 'Dedicated support',
    },
  ];
}
