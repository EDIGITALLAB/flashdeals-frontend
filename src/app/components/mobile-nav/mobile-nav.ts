import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { AlertsModal } from '../alerts-modal/alerts-modal';

@Component({
  selector: 'app-mobile-nav',
  imports: [CommonModule, RouterLink, AlertsModal],
  templateUrl: './mobile-nav.html',
  styleUrl: './mobile-nav.css',
})
export class MobileNav {
  showAlertsModal = false;

  constructor(private router: Router) {}

  toggleAlerts(event: Event) {
    event.preventDefault();
    this.showAlertsModal = !this.showAlertsModal;
  }

  isRouteActive(routePath: string): boolean {
    return this.router.url === routePath;
  }
}
