import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-sidebar',
  imports: [CommonModule],
  templateUrl: './profile-sidebar.html',
  styleUrl: './profile-sidebar.css',
})
export class ProfileSidebar {
  @Input() activeMenu: string = 'personal';
  @Output() menuChanged = new EventEmitter<string>();

  selectMenu(menu: string) {
    this.menuChanged.emit(menu);
  }

  logout() {
    alert('Logged out successfully!');
  }
}
