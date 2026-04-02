import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ThemeService } from '../../core/services/theme.service';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  authService = inject(AuthService);
  themeService = inject(ThemeService);
  userService = inject(UserService);
  private router = inject(Router);

  showUserMenu = false;
  mobileMenuOpen = false;

  get userName(): string {
    const user = this.authService.currentUser();
    return user?.name || user?.email || 'User';
  }

  get userInitials(): string {
    return this.userName.charAt(0).toUpperCase();
  }

  get userAvatarUrl(): string | null {
    return this.authService.currentUser()?.avatar || null;
  }

  toggleTheme() {
    this.themeService.toggle();
  }

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  navigateToProfile() {
    this.showUserMenu = false;
    this.mobileMenuOpen = false;
    this.router.navigate(['/profile']);
  }

  logout() {
    this.showUserMenu = false;
    this.mobileMenuOpen = false;
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
