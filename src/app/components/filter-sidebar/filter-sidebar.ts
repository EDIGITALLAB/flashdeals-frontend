import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter-sidebar',
  imports: [CommonModule],
  templateUrl: './filter-sidebar.html',
  styleUrl: './filter-sidebar.css',
})
export class FilterSidebar {
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();

  // Categories state
  selectedCategories: { [key: string]: boolean } = {
    all: true,
    men: false,
    women: false,
    kids: false
  };

  // Brands list & search state
  brandSearchQuery = '';
  showMoreBrands = false;
  allBrands = [
    { name: 'Nike', count: 120 },
    { name: 'Adidas', count: 98 },
    { name: 'Puma', count: 76 },
    { name: 'Reebok', count: 45 },
    { name: 'Skechers', count: 34 },
    { name: 'Under Armour', count: 28 },
    { name: 'ASICS', count: 22 },
    { name: 'Converse', count: 19 },
    { name: 'New Balance', count: 15 }
  ];
  selectedBrands: { [key: string]: boolean } = {};

  // Sliders state
  selectedDiscount = 80;
  selectedPrice = 5000;

  // Ratings state
  ratingFourAndAbove = false;

  get filteredBrands() {
    const query = this.brandSearchQuery.toLowerCase().trim();
    if (!query) {
      return this.showMoreBrands ? this.allBrands : this.allBrands.slice(0, 5);
    }
    return this.allBrands.filter(b => b.name.toLowerCase().includes(query));
  }

  get discountPercent(): number {
    return ((this.selectedDiscount - 10) / 90) * 100;
  }

  get pricePercent(): number {
    return ((this.selectedPrice - 500) / 4500) * 100;
  }

  onCategoryChange(cat: string, event: any) {
    const checked = event.target.checked;
    if (cat === 'all') {
      this.selectedCategories = { all: checked, men: false, women: false, kids: false };
    } else {
      this.selectedCategories[cat] = checked;
      if (checked) {
        this.selectedCategories['all'] = false;
      } else {
        const hasAny = this.selectedCategories['men'] || this.selectedCategories['women'] || this.selectedCategories['kids'];
        if (!hasAny) {
          this.selectedCategories['all'] = true;
        }
      }
    }
  }

  onBrandSearch(event: any) {
    this.brandSearchQuery = event.target.value;
  }

  onBrandChange(brandName: string, event: any) {
    this.selectedBrands[brandName] = event.target.checked;
  }

  onDiscountInput(event: any) {
    this.selectedDiscount = +event.target.value;
  }

  onPriceInput(event: any) {
    this.selectedPrice = +event.target.value;
  }

  onRatingChange(event: any) {
    this.ratingFourAndAbove = event.target.checked;
  }

  clearAll() {
    // Reset Categories
    this.selectedCategories = { all: true, men: false, women: false, kids: false };

    // Reset Brands
    this.selectedBrands = {};
    this.brandSearchQuery = '';

    // Reset Sliders
    this.selectedDiscount = 80;
    this.selectedPrice = 5000;

    // Reset Ratings
    this.ratingFourAndAbove = false;
  }

  onClose() {
    this.close.emit();
  }

  toggleMoreBrands() {
    this.showMoreBrands = !this.showMoreBrands;
  }
}
