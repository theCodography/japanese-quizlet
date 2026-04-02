import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { ErrorDialogComponent } from '../../components/error-dialog/error-dialog.component';

const AVATAR_MAX_SIZE = 256;
const AVATAR_QUALITY = 0.8;

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ErrorDialogComponent],
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

  errorDialog = signal<{ title: string; message: string } | null>(null);

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
        this.avatarUrl.set(profile.avatar || null);
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        this.showError(err);
      }
    });
  }

  triggerAvatarUpload() {
    document.getElementById('avatarInput')?.click();
  }

  onAvatarChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      this.errorDialog.set({ title: 'Invalid file', message: 'Please select an image file.' });
      return;
    }

    this.resizeImage(file).then((base64) => {
      this.avatarUrl.set(base64);
      this.userService.updateProfile({ avatar: base64 }).subscribe({
        next: () => {},
        error: (err) => this.showError(err)
      });
    });
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
      error: (err) => {
        this.saving.set(false);
        this.showError(err);
      }
    });
  }

  private showError(err: any) {
    const message = err?.error?.message || err?.message || 'Something went wrong. Please try again.';
    this.errorDialog.set({ title: 'Error', message });
  }

  private resizeImage(file: File): Promise<string> {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = img;

        if (width > height) {
          if (width > AVATAR_MAX_SIZE) {
            height = Math.round(height * AVATAR_MAX_SIZE / width);
            width = AVATAR_MAX_SIZE;
          }
        } else {
          if (height > AVATAR_MAX_SIZE) {
            width = Math.round(width * AVATAR_MAX_SIZE / height);
            height = AVATAR_MAX_SIZE;
          }
        }

        canvas.width = width;
        canvas.height = height;
        canvas.getContext('2d')!.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', AVATAR_QUALITY));
        URL.revokeObjectURL(img.src);
      };
      img.src = URL.createObjectURL(file);
    });
  }
}
