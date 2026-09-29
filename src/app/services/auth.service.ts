import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Check localStorage or default to logged in
  isLoggedIn = signal<boolean>(localStorage.getItem('isLoggedIn') !== 'false');
  userRole = signal<'admin' | 'user' | null>(
    (localStorage.getItem('userRole') as 'admin' | 'user') || 'user'
  );

  login(role: 'admin' | 'user' = 'user') {
    this.isLoggedIn.set(true);
    this.userRole.set(role);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userRole', role);
  }

  logout() {
    this.isLoggedIn.set(false);
    this.userRole.set(null);
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('userRole');
  }
}
