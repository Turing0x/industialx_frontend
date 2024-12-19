import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../interface/user.interface';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HowWeWorkComponent } from '../../components/how-we-work/how-we-work.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
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
      await this.router.navigate(['/dashboard']);
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
      await this.router.navigate(['/dashboard']);
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
      await this.authService.signInWithFacebook();
      await this.router.navigate(['/dashboard']);
    } catch (error) {
      console.error('Facebook sign in failed:', error);
      // Handle error appropriately
    } finally {
      this.isLoading.set(false);
    }
  }
}
