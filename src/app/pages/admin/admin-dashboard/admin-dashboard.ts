import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboard {
  stats = [
    { title: 'Total Users', value: '12,548', change: '+12%', isPositive: true, icon: 'group' },
    { title: 'Total Brands', value: '48', change: '+5%', isPositive: true, icon: 'stars' },
    { title: 'Total Deals', value: '286', change: '+10%', isPositive: true, icon: 'bolt' },
    { title: 'Active Deals', value: '243', change: '+20%', isPositive: true, icon: 'local_fire_department' }
  ];

  recentDeals = [
    { id: 1, title: 'iPhone 15 (256GB)', brand: 'Apple', category: 'Electronics', discount: '₹12,000 (15%)', status: 'Published', published: true },
    { id: 2, title: 'Nike Running Shoes', brand: 'Nike', category: 'Fashion', discount: '₹2,500 (20%)', status: 'Published', published: true },
    { id: 3, title: 'Noise Smart Watch', brand: 'Noise', category: 'Electronics', discount: '₹1,500 (15%)', status: 'Published', published: true },
    { id: 4, title: 'boAt Airdopes 141', brand: 'boAt', category: 'Electronics', discount: '₹3,000 (67%)', status: 'Published', published: true }
  ];

  toggleDealStatus(deal: any) {
    deal.published = !deal.published;
    deal.status = deal.published ? 'Published' : 'Draft';
  }
}
