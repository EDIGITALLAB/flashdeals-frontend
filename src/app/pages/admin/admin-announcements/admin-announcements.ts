import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-admin-announcements',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-announcements.html',
  styleUrl: './admin-announcements.css'
})
export class AdminAnnouncements {
  showAddModal: boolean = false;
  newTitle: string = '';
  newType: string = 'Promotion';
  newPriority: string = 'High';

  announcements = [
    { id: 1, title: 'Big Fashion Sale is Live!', type: 'Promotion', priority: 'High', startDate: 'Apr 25, 2025', endDate: 'Apr 30, 2025', status: 'Active' },
    { id: 2, title: 'Platform Maintenance', type: 'Maintenance', priority: 'Medium', startDate: 'May 2, 2025', endDate: 'May 2, 2025', status: 'Active' },
    { id: 3, title: 'New Brands Added', type: 'General', priority: 'Low', startDate: 'May 3, 2025', endDate: 'May 5, 2025', status: 'Active' },
    { id: 4, title: 'Festive Offer Announcement', type: 'Promotion', priority: 'High', startDate: 'Apr 20, 2025', endDate: 'May 10, 2025', status: 'Scheduled' },
    { id: 5, title: 'App Update Available', type: 'General', priority: 'Medium', startDate: 'Apr 18, 2025', endDate: 'Apr 20, 2025', status: 'Expired' }
  ];

  addAnnouncement() {
    if (this.newTitle.trim()) {
      this.announcements.unshift({
        id: Date.now(),
        title: this.newTitle,
        type: this.newType,
        priority: this.newPriority,
        startDate: 'Apr 28, 2025',
        endDate: 'May 15, 2025',
        status: 'Active'
      });
      this.showAddModal = false;
      this.newTitle = '';
    }
  }

  deleteAnnouncement(index: number) {
    this.announcements.splice(index, 1);
  }
}
