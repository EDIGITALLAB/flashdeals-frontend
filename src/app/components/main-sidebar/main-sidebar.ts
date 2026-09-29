import { Component, HostBinding } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UpgradeModal } from '../upgrade-modal/upgrade-modal';
import { BrandsModal } from '../brands-modal/brands-modal';
import { AlertsModal } from '../alerts-modal/alerts-modal';
import { SidebarService } from '../../services/sidebar.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-main-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, UpgradeModal, BrandsModal, AlertsModal],
  templateUrl: './main-sidebar.html',
  styleUrl: './main-sidebar.css',
})
export class MainSidebar {
  showUpgradeModal = false;
  showBrandsModal = false;
  showAlertsModal = false;

  constructor(
    public sidebarService: SidebarService,
    public authService: AuthService,
    private router: Router
  ) {}

  @HostBinding('class.collapsed')
  get isCollapsed() {
    return this.sidebarService.isCollapsed();
  }

  logoutUser() {
    this.authService.logout();
  }

  toggleUpgradeModal(event: Event) {
    event.preventDefault();
    this.showUpgradeModal = !this.showUpgradeModal;
  }

  closeUpgradeModal() {
    this.showUpgradeModal = false;
  }

  toggleBrandsModal(event: Event) {
    event.preventDefault();
    this.showBrandsModal = !this.showBrandsModal;
  }

  toggleAlertsModal(event: Event) {
    event.preventDefault();
    this.showAlertsModal = !this.showAlertsModal;
  }
}
