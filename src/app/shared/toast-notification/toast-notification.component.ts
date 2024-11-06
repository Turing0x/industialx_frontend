import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toast-notification',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './toast-notification.component.html',
  styleUrl: './toast-notification.component.css',
})
  
export class ToastNotificationComponent {
  @Input() text!: string;
}
