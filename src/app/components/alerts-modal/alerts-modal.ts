import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AlertNotification } from '../../models/alert-notification.model';

@Component({
  selector: 'app-alerts-modal',
  imports: [CommonModule],
  templateUrl: './alerts-modal.html',
  styleUrl: './alerts-modal.css',
})
export class AlertsModal {
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();

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
    }
  ];

  constructor(private router: Router) {}

  clickNotification(notif: AlertNotification) {
    this.closeModal();
    if (notif.queryParams) {
      this.router.navigate([notif.routeLink], { queryParams: notif.queryParams });
    } else {
      this.router.navigate([notif.routeLink]);
    }
  }

  closeModal() {
    this.close.emit();
  }
}
