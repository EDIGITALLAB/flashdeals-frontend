import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-admin-deal-analytics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-deal-analytics.html',
  styleUrl: './admin-deal-analytics.css'
})
export class AdminDealAnalytics {
  analyticsStats = [
    { title: 'Total Impressions', value: '148,290', change: '+18%', isPositive: true },
    { title: 'Total Clicks', value: '42,180', change: '+24%', isPositive: true },
    { title: 'Conversion Rate', value: '6.4%', change: '+3.2%', isPositive: true },
    { title: 'Total Revenue Generated', value: '₹14,85,000', change: '+15%', isPositive: true }
  ];

  topDeals = [
    { title: 'iPhone 15 (256GB)', brand: 'Apple', clicks: '14,280', conversions: '890', revenue: '₹6,05,210' },
    { title: 'Nike Revolution 6', brand: 'Nike', clicks: '9,840', conversions: '640', revenue: '₹3,19,936' },
    { title: 'boAt Airdopes 141', brand: 'boAt', clicks: '8,120', conversions: '510', revenue: '₹6,62,490' },
    { title: 'Samsung 55" TV', brand: 'Samsung', clicks: '6,450', conversions: '230', revenue: '₹9,88,970' }
  ];
}
