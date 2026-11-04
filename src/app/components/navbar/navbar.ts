import { Component, HostListener, ElementRef, OnInit } from '@angular/core';
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
export class Navbar implements OnInit {
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

  ngOnInit() {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('flashdeals_user_location');
        if (saved && this.locations.includes(saved)) {
          this.selectedLocation = saved;
        }
      } catch (e) {}
    }
  }

  toggleSidebar() {
    this.sidebarService.toggle();
  }

  goToNotifications() {
    this.router.navigate(['/notifications']);
  }

  goToMyDeals() {
    this.router.navigate(['/explore']);
  }

  goToWishlist() {
    this.router.navigate(['/explore']);
  }

  toggleDropdown(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.showDropdown = !this.showDropdown;
  }

  selectLocation(loc: string, event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.selectedLocation = loc;
    this.showDropdown = false;
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('flashdeals_user_location', loc);
      } catch (e) {}
    }
  }

  toggleMobileSearch() {
    this.showMobileSearch = !this.showMobileSearch;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const container = this.elementRef.nativeElement.querySelector('.location-picker-container');
    if (this.showDropdown && container && !container.contains(event.target as Node)) {
      this.showDropdown = false;
    }
  }
}
