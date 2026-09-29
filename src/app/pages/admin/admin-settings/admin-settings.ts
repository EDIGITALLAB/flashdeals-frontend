import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-admin-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-settings.html',
  styleUrl: './admin-settings.css'
})
export class AdminSettings {
  siteName: string = 'FlashDeals';
  supportEmail: string = 'support@flashdeals.com';
  autoApproveDeals: boolean = true;
  emailNotifications: boolean = true;
  saved: boolean = false;

  saveSettings() {
    this.saved = true;
    setTimeout(() => this.saved = false, 3000);
  }
}
