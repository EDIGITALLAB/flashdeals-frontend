import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AlertNotification } from '../../models/alert-notification.model';

@Component({
  selector: 'app-alerts-modal',
  imports: [CommonModule],
  templateUrl: './alerts-modal.html',
  styleUrl: './alerts-modal.css',
})
export class AlertsModal implements OnDestroy {
  private _isOpen = false;

  @Input()
  set isOpen(value: boolean) {
    this._isOpen = value;
    if (typeof document !== 'undefined') {
      if (value) {
        document.documentElement.classList.add('modal-open');
        document.body.classList.add('modal-open');
      } else {
        document.documentElement.classList.remove('modal-open');
        document.body.classList.remove('modal-open');
      }
    }
  }

  get isOpen(): boolean {
    return this._isOpen;
  }

  @Output() close = new EventEmitter<void>();

  startY = 0;
  currentY = 0;
  translateY = 0;
  isDragging = false;

  onTouchStart(event: TouchEvent) {
    const target = event.target as HTMLElement;
    // Don't intercept drag if touch starts inside the scrollable notification list
    if (target.closest('.notifications-feed-list')) {
      return;
    }
    this.startY = event.touches[0].clientY;
    this.isDragging = true;
  }

  onTouchMove(event: TouchEvent) {
    if (!this.isDragging) return;
    this.currentY = event.touches[0].clientY;
    const deltaY = this.currentY - this.startY;
    // Only allow dragging downwards
    if (deltaY > 0) {
      this.translateY = deltaY;
    }
  }

  onTouchEnd() {
    if (!this.isDragging) return;
    this.isDragging = false;
    if (this.translateY > 100) {
      // Swiped down far enough, close the modal
      this.closeModal();
    }
    // Snap back to original position
    this.translateY = 0;
  }

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
    this.translateY = 0;
    this.isDragging = false;
    this.close.emit();
  }

  viewAllNotifications() {
    this.closeModal();
    this.router.navigate(['/notifications']);
  }

  ngOnDestroy() {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove('modal-open');
      document.body.classList.remove('modal-open');
    }
  }
}
