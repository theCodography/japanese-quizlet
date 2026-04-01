import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService, RegisterPayload } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="register-container">
      <h2>Đăng ký</h2>
      <form (ngSubmit)="onSubmit()">
        <div>
          <label for="username">Tên người dùng</label>
          <input id="username" type="text" [(ngModel)]="form.username" name="username" required placeholder="Tên của bạn" />
        </div>
        <div>
          <label for="email">Email</label>
          <input id="email" type="email" [(ngModel)]="form.email" name="email" required placeholder="email@example.com" />
        </div>
        <div>
          <label for="password">Mật khẩu</label>
          <input id="password" type="password" [(ngModel)]="form.password" name="password" required placeholder="••••••••" />
        </div>
        <p class="error" *ngIf="errorMessage">{{ errorMessage }}</p>
        <button type="submit" [disabled]="loading">
          {{ loading ? 'Đang đăng ký...' : 'Đăng ký' }}
        </button>
      </form>
      <p>Đã có tài khoản? <a routerLink="/login">Đăng nhập</a></p>
    </div>
  `,
  styles: [`
    .register-container { max-width: 400px; margin: 80px auto; padding: 24px; }
    div { margin-bottom: 16px; }
    label { display: block; margin-bottom: 4px; }
    input { width: 100%; padding: 8px; box-sizing: border-box; }
    button { width: 100%; padding: 10px; cursor: pointer; }
    .error { color: red; }
  `]
})
export class RegisterComponent {
  form: RegisterPayload = { email: '', username: '', password: '' };
  loading = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.errorMessage = '';
    this.loading = true;

    this.authService.register(this.form).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Đăng ký thất bại';
        this.loading = false;
      }
    });
  }
}
