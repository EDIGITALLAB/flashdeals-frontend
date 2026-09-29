import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-sidebar.html',
  styleUrl: './profile-sidebar.css',
})
export class ProfileSidebar {
  @Input() activeMenu: string = 'personal';
  @Output() menuChanged = new EventEmitter<string>();

  constructor(public authService: AuthService) {}

  selectMenu(menu: string) {
    this.menuChanged.emit(menu);
  }

  logout() {
    this.authService.logout();
  }
}
