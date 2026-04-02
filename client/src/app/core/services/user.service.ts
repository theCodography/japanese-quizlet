import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly apiUrl = environment.apiUrl;
  profile = signal<UserProfile | null>(null);

  constructor(private http: HttpClient) {}

  getProfile() {
    return this.http.get<UserProfile>(`${this.apiUrl}/users/me`);
  }

  updateProfile(data: { name: string }) {
    return this.http.put<UserProfile>(`${this.apiUrl}/users/me`, data);
  }
}
