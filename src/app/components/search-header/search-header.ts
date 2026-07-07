import { Component, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './search-header.html',
  styleUrl: './search-header.css',
})
export class SearchHeader {
  @Output() filterToggle = new EventEmitter<void>();
  showMobileSearch = false;

  onFilterClick() {
    this.filterToggle.emit();
  }

  toggleMobileSearch() {
    this.showMobileSearch = !this.showMobileSearch;
  }
}
