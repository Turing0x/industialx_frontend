import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interface/user.interface';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPageComponent {
  private readonly router = inject(Router);

  registerData = signal<User>({
    email: '',
    password: '',
  });

  isLoading = signal(false);
  private readonly authService = inject(AuthService);

  async onSubmit(form: NgForm): Promise<void> {
    if (form.invalid) {
      return;
    }

    try {
      this.isLoading.set(true);
      this.authService.register(this.registerData());
      // await this.router.navigate(['/']);
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle error appropriately
    } finally {
      this.isLoading.set(false);
    }
  }

  async signInWithGoogle(): Promise<void> {
    try {
      this.isLoading.set(true);
      this.authService.signInWithGoogle();
      await this.router.navigate(['/']);
    } catch (error) {
      console.error('Google sign in failed:', error);
      // Handle error appropriately
    } finally {
      this.isLoading.set(false);
    }
  }

  async signInWithFacebook(): Promise<void> {
    try {
      this.isLoading.set(true);
      this.authService.signInWithFacebook();
      await this.router.navigate(['/']);
    } catch (error) {
      console.error('Facebook sign in failed:', error);
      // Handle error appropriately
    } finally {
      this.isLoading.set(false);
    }
  }
}
