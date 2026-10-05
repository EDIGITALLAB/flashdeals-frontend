import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admin-register.html',
  styleUrl: './admin-register.css'
})
export class AdminRegister {
  fullName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  role: 'admin' | 'user' = 'user';
  agreeTerms: boolean = false;
  showPassword: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSellerRegister() {
    this.role = 'admin';
    if (!this.fullName || !this.email || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Please fill in all required fields to register as a Seller.';
      return;
    }
    this.onSubmit();
  }

  onSubmit() {
    if (!this.fullName || !this.email || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters long.';
      return;
    }

    if (!this.agreeTerms) {
      this.errorMessage = 'Please accept the Terms of Service to continue.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    setTimeout(() => {
      this.isLoading = false;
      this.authService.login(this.role);
      const roleName = this.role === 'admin' ? 'Seller / Admin' : 'User';
      this.successMessage = `${roleName} account created successfully! Redirecting...`;

      setTimeout(() => {
        if (this.role === 'admin') {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.router.navigate(['/']);
        }
      }, 1000);
    }, 1000);
  }
}
