import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './user-profile.component.html'
})
export class UserProfileComponent implements OnInit {
  fullName = signal('');
  email = signal('');
  avatarUrl = signal<string | null>(null);
  studyReminders = signal(true);
  communityUpdates = signal(false);
  loading = signal(false);
  saving = signal(false);
  saveSuccess = signal(false);
  saveError = signal('');

  streak = signal(12);
  lessonsCompleted = signal(45);
  jlptDaysLeft = signal(85);
  jlptProgress = signal(67);

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loading.set(true);
    this.userService.getProfile().subscribe({
      next: (profile) => {
        this.fullName.set(profile.name || '');
        this.email.set(profile.email || '');
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  triggerAvatarUpload() {
    document.getElementById('avatarInput')?.click();
  }

  onAvatarChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => this.avatarUrl.set(e.target?.result as string);
    reader.readAsDataURL(file);
  }

  getInitials(): string {
    return this.fullName() ? this.fullName().charAt(0).toUpperCase() : '?';
  }

  saveChanges() {
    this.saving.set(true);
    this.saveSuccess.set(false);
    this.saveError.set('');
    this.userService.updateProfile({ name: this.fullName() }).subscribe({
      next: () => {
        this.saving.set(false);
        this.saveSuccess.set(true);
        setTimeout(() => this.saveSuccess.set(false), 3000);
      },
      error: () => {
        this.saving.set(false);
        this.saveError.set('Failed to save changes. Please try again.');
      }
    });
  }
}
