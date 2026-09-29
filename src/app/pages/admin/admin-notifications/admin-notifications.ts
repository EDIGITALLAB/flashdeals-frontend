import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-admin-notifications',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-notifications.html',
  styleUrl: './admin-notifications.css'
})
export class AdminNotifications {
  notificationType: string = 'Flash Sale Alert';
  template: string = 'Select Template';
  subject: string = '🔥 Flat 60% OFF on Nike Running Shoes!';
  message: string = 'Grab your favorite Nike running shoes now at unbeatable prices. Limited stock available!';
  targetAudience: string = 'All Users';
  showSuccessModal: boolean = false;

  channels = {
    email: true,
    sms: false,
    whatsapp: true,
    push: true,
    inApp: true
  };

  sendNotification() {
    this.showSuccessModal = true;
  }
}
