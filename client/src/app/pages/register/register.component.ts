import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService, RegisterPayload } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  form: RegisterPayload = { email: '', username: '', password: '' };
  confirmPassword = '';
  loading = signal(false);
  errorMessage = signal('');
  showPassword = signal(false);
  showConfirmPassword = signal(false);

  constructor(private authService: AuthService, private router: Router) {}

  togglePassword() {
    this.showPassword.set(!this.showPassword());
  }

  toggleConfirmPassword() {
    this.showConfirmPassword.set(!this.showConfirmPassword());
  }

  onSubmit(): void {
    this.errorMessage.set('');

    if (this.form.password !== this.confirmPassword) {
      this.errorMessage.set('Mat khau xac nhan khong khop');
      return;
    }

    if (this.form.password.length < 6) {
      this.errorMessage.set('Mat khau phai co it nhat 6 ky tu');
      return;
    }

    this.loading.set(true);

    this.authService.register(this.form).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (err) => {
        this.errorMessage.set(err?.error?.message || 'Dang ky that bai');
        this.loading.set(false);
      }
    });
  }
}
