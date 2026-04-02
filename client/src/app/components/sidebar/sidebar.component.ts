import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  userName = computed(() => {
    const user = this.authService.currentUser();
    return user?.name || user?.email || 'User';
  });

  userInitials = computed(() => this.userName().charAt(0).toUpperCase());

  userAvatarUrl = computed(() => this.authService.currentUser()?.avatar || null);

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
