import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-admin-scheduled-deals',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admin-scheduled-deals.html',
  styleUrl: './admin-scheduled-deals.css'
})
export class AdminScheduledDeals {
  scheduledDeals = [
    { id: 1, title: 'iPhone 15 (256GB)', brand: 'Apple', icon: '📱', scheduledTime: 'May 5, 2025 10:00 AM', status: 'Scheduled' },
    { id: 2, title: 'Nike Running Shoes', brand: 'Nike', icon: '👟', scheduledTime: 'May 6, 2025 12:00 PM', status: 'Scheduled' },
    { id: 3, title: 'Samsung TV 55"', brand: 'Samsung', icon: '📺', scheduledTime: 'May 7, 2025 09:00 AM', status: 'Scheduled' },
    { id: 4, title: 'Myntra Fashion Sale', brand: 'Myntra', icon: '👗', scheduledTime: 'May 8, 2025 11:00 AM', status: 'Scheduled' },
    { id: 5, title: 'Home Appliances', brand: 'Flipkart', icon: '🏠', scheduledTime: 'May 10, 2025 05:00 PM', status: 'Scheduled' }
  ];

  deleteDeal(index: number) {
    this.scheduledDeals.splice(index, 1);
  }
}
