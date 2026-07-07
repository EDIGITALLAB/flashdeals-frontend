import { Component, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-search-header',
  imports: [RouterLink],
  templateUrl: './search-header.html',
  styleUrl: './search-header.css',
})
export class SearchHeader {
  @Output() filterToggle = new EventEmitter<void>();

  onFilterClick() {
    this.filterToggle.emit();
  }
}
