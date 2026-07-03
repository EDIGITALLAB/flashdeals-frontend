import { Component, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  selectedLocation = 'Bengaluru';
  showDropdown = false;
  locations = ['Bengaluru', 'Mumbai', 'Delhi NCR', 'Pune', 'Hyderabad', 'Chennai', 'Kolkata'];

  constructor(private elementRef: ElementRef) {}

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  selectLocation(loc: string) {
    this.selectedLocation = loc;
    this.showDropdown = false;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.showDropdown = false;
    }
  }
}
