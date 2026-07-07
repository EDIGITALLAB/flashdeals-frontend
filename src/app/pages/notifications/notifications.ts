import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AlertNotification } from '../../models/alert-notification.model';

@Component({
  selector: 'app-notifications',
  imports: [CommonModule, RouterLink],
  templateUrl: './notifications.html',
  styleUrl: './notifications.css',
})
export class Notifications {
  notifications: AlertNotification[] = [
    {
      id: 1,
      title: 'Massive Price Drop!',
      message: 'Nike Revolution 6 Men\'s Running Shoes price dropped from ₹4,695 to ₹2,099.',
      timeString: '2 mins ago',
      icon: 'local_offer',
      colorClass: 'price-drop',
      routeLink: '/explore',
      queryParams: { brand: 'Nike' }
    },
    {
      id: 2,
      title: 'VIP Early Access Live',
      message: 'Early access is now live for Pro Gaming Accessories with flat 40% discount!',
      timeString: '15 mins ago',
      icon: 'diamond',
      colorClass: 'early-access',
      routeLink: '/my-interests'
    },
    {
      id: 3,
      title: 'Deal Ending Soon!',
      message: 'Samsung Galaxy deals are ending in less than 30 minutes. Hurry up!',
      timeString: '1 hour ago',
      icon: 'alarm',
      colorClass: 'ending-soon',
      routeLink: '/explore'
    },
    {
      id: 4,
      title: 'Added to Watchlist',
      message: 'You have successfully watchlisted Adidas Ultraboost 22 Running Shoes.',
      timeString: '3 hours ago',
      icon: 'favorite',
      colorClass: 'watchlisted',
      routeLink: '/my-deals'
    },
    {
      id: 5,
      title: 'Flash Sale Starting!',
      message: 'The Puma Sports collection flash sale starts in 10 minutes. Get ready!',
      timeString: '5 hours ago',
      icon: 'bolt',
      colorClass: 'price-drop',
      routeLink: '/explore'
    },
    {
      id: 6,
      title: 'New Deal Alert',
      message: 'Exclusive deal on Apple AirPods Pro 2nd Gen — ₹6,999 for the next 2 hours only!',
      timeString: 'Yesterday',
      icon: 'notifications_active',
      colorClass: 'early-access',
      routeLink: '/explore'
    }
  ];

  constructor(private router: Router) {}

  clickNotification(notif: AlertNotification) {
    if (notif.queryParams) {
      this.router.navigate([notif.routeLink], { queryParams: notif.queryParams });
    } else {
      this.router.navigate([notif.routeLink]);
    }
  }

  markAllRead() {
    // future: mark all as read
  }
}
