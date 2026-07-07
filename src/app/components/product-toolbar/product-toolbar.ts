import { Component, Input, Output, EventEmitter, HostBinding, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

interface PriceOption {
  label: string;
  min: number | null;
  max: number | null;
}

@Component({
  selector: 'app-product-toolbar',
  imports: [CommonModule],
  templateUrl: './product-toolbar.html',
  styleUrl: './product-toolbar.css',
})
export class ProductToolbar {
  @Input() view: 'pills' | 'header' = 'pills';
  @Input() viewMode: 'list' | 'grid' = 'list';
  @Output() viewModeChange = new EventEmitter<'list' | 'grid'>();

  @Input() selectedPriceFilterLabel = 'All';
  @Output() priceFilterChange = new EventEmitter<{ min: number | null; max: number | null; label: string }>();

  @Input() selectedSortLabel = 'Sort By';
  @Output() sortChange = new EventEmitter<string>();

  showPriceDropdown = false;
  showSortDropdown = false;

  priceOptions: PriceOption[] = [
    { label: 'All', min: null, max: null },
    { label: 'Under ₹2,000', min: 0, max: 2000 },
    { label: '₹2,000 - ₹5,000', min: 2000, max: 5000 },
    { label: '₹5,000 - ₹10,000', min: 5000, max: 10000 },
    { label: 'Over ₹10,000', min: 10000, max: null }
  ];

  sortOptions = [
    { label: 'Relevance', value: 'relevance' },
    { label: 'Price: Low to High', value: 'price_asc' },
    { label: 'Price: High to Low', value: 'price_desc' },
    { label: 'Discount: High to Low', value: 'discount_desc' },
    { label: 'Rating: High to Low', value: 'rating_desc' }
  ];

  constructor(private elementRef: ElementRef) {}

  @HostBinding('class') get hostClass() {
    return this.view === 'pills' ? 'toolbar-pills' : 'toolbar-header';
  }

  setViewMode(mode: 'list' | 'grid') {
    this.viewMode = mode;
    this.viewModeChange.emit(mode);
  }

  togglePriceDropdown() {
    this.showPriceDropdown = !this.showPriceDropdown;
    this.showSortDropdown = false;
  }

  toggleSortDropdown() {
    this.showSortDropdown = !this.showSortDropdown;
    this.showPriceDropdown = false;
  }

  selectPriceFilter(opt: PriceOption) {
    this.selectedPriceFilterLabel = opt.label;
    this.showPriceDropdown = false;
    this.priceFilterChange.emit({ min: opt.min, max: opt.max, label: opt.label });
  }

  selectSortOption(opt: { label: string; value: string }) {
    this.selectedSortLabel = opt.label;
    this.showSortDropdown = false;
    this.sortChange.emit(opt.value);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.showPriceDropdown = false;
      this.showSortDropdown = false;
    }
  }

  @HostListener('window:scroll')
  onScroll() {
    this.showPriceDropdown = false;
    this.showSortDropdown = false;
  }
}
