import { Component, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  selectedLocation = 'Bengaluru';
  showDropdown = false;
  showMobileSearch = false;
  locations = ['Bengaluru', 'Mumbai', 'Delhi NCR', 'Pune', 'Hyderabad', 'Chennai', 'Kolkata'];

  constructor(private elementRef: ElementRef, private router: Router) {}

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
  onClickOutside(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.showDropdown = false;
      this.showMobileSearch = false;
    }
  }

  @HostListener('window:scroll')
  onScroll() {
    this.showDropdown = false;
  }
}
