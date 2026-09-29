import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './admin-sidebar.html',
  styleUrl: './admin-sidebar.css'
})
export class AdminSidebar {
  @Input() activeItem: string = 'dashboard';
  dealsExpanded: boolean = true;

  constructor(private router: Router) {}

  toggleDeals() {
    this.dealsExpanded = !this.dealsExpanded;
  }

  logout() {
    this.router.navigate(['/admin/login']);
  }
}
