import { Component, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { SidebarService } from '../../services/sidebar.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  selectedLocation = 'Bengaluru';
  showDropdown = false;
  showMobileSearch = false;
  locations = ['Bengaluru', 'Mumbai', 'Delhi NCR', 'Pune', 'Hyderabad', 'Chennai', 'Kolkata'];

  constructor(
    private elementRef: ElementRef,
    private router: Router,
    public sidebarService: SidebarService,
    public themeService: ThemeService
  ) {}

  toggleSidebar() {
    this.sidebarService.toggle();
  }

  goToNotifications() {
    this.router.navigate(['/notifications']);
  }

  goToMyDeals() {
    this.router.navigate(['/my-deals']);
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  selectLocation(loc: string) {
    this.selectedLocation = loc;
    this.showDropdown = false;
  }

  toggleMobileSearch() {
    this.showMobileSearch = !this.showMobileSearch;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.showDropdown && !this.elementRef.nativeElement.querySelector('.location-selector')?.contains(event.target)) {
      this.showDropdown = false;
    }
  }
}
