import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastSubject = new BehaviorSubject<{
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
    duration?: number;
  } | null>(null);

  toast$ = this.toastSubject.asObservable();

  showToast(
    message: string,
    type: 'success' | 'error' | 'info' | 'warning',
    duration = 2000
  ): void {
    this.toastSubject.next({ message, type, duration });
  }

  destroy(): void {
    this.toastSubject.complete();
  }
}
