import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UpgradeModal } from '../upgrade-modal/upgrade-modal';
import { BrandsModal } from '../brands-modal/brands-modal';
import { AlertsModal } from '../alerts-modal/alerts-modal';

@Component({
  selector: 'app-main-sidebar',
  imports: [RouterLink, RouterLinkActive, CommonModule, UpgradeModal, BrandsModal, AlertsModal],
  templateUrl: './main-sidebar.html',
  styleUrl: './main-sidebar.css',
})
export class MainSidebar {
  showUpgradeModal = false;
  showBrandsModal = false;
  showAlertsModal = false;

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
