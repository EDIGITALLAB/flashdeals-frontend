import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { InterestItem } from '../../models/interest-item.model';

@Component({
  selector: 'app-my-interests',
  imports: [CommonModule, RouterLink],
  templateUrl: './my-interests.html',
  styleUrl: './my-interests.css',
})
export class MyInterests {
  interests: InterestItem[] = [
    { id: 'fashion', name: 'Fashion', icon: 'apparel', selected: true },
    { id: 'electronics', name: 'Electronics', icon: 'devices', selected: true },
    { id: 'beauty', name: 'Beauty', icon: 'face', selected: false },
    { id: 'home', name: 'Home & Living', icon: 'home', selected: true },
    { id: 'food', name: 'Food & Dining', icon: 'restaurant', selected: false },
    { id: 'travel', name: 'Travel', icon: 'flight', selected: false },
    { id: 'health', name: 'Health & Fitness', icon: 'favorite', selected: false },
    { id: 'kids', name: 'Kids & Toys', icon: 'smart_toy', selected: false },
    { id: 'books', name: 'Books', icon: 'book', selected: false },
    { id: 'automotive', name: 'Automotive', icon: 'directions_car', selected: false }
  ];

  selectedBrands = ['Nike', 'Adidas', 'Puma', 'Myntra', 'boAt'];
  allBrands = ['Nike', 'Adidas', 'Puma', 'Myntra', 'boAt', 'Skechers', 'Reebok', 'Roadster', 'HRX', 'OnePlus', 'Sony', 'Samsung', 'Philips'];
  brandSearchQuery = '';

  showAddCustomInput = false;
  customInterestText = '';

  saveSuccess = false;

  toggleInterest(item: InterestItem) {
    item.selected = !item.selected;
  }

  toggleAddCustomInput() {
    this.showAddCustomInput = !this.showAddCustomInput;
    this.customInterestText = '';
  }

  onCustomInterestInput(event: any) {
    this.customInterestText = event.target.value;
  }

  onCustomInterestKeyDown(event: any) {
    if (event.key === 'Enter') {
      this.addCustomInterest();
    }
  }

  addCustomInterest() {
    const text = this.customInterestText.trim();
    if (text) {
      const id = text.toLowerCase().replace(/\s+/g, '-');
      // Avoid duplicate id
      if (!this.interests.find(i => i.id === id)) {
        this.interests.push({
          id,
          name: text,
          icon: 'stars',
          selected: true
        });
      }
      this.toggleAddCustomInput();
    }
  }

  onBrandSearchInput(event: any) {
    this.brandSearchQuery = event.target.value;
  }

  onBrandKeyDown(event: any) {
    if (event.key === 'Enter') {
      const val = event.target.value.trim();
      if (val) {
        this.addBrand(val);
      }
    }
  }

  addBrand(brand: string) {
    const trimmed = brand.trim();
    if (trimmed && !this.selectedBrands.some(b => b.toLowerCase() === trimmed.toLowerCase())) {
      this.selectedBrands.push(trimmed);
    }
    this.brandSearchQuery = '';
  }

  removeBrand(brand: string) {
    this.selectedBrands = this.selectedBrands.filter(b => b !== brand);
  }

  get brandSuggestions(): string[] {
    const query = this.brandSearchQuery.toLowerCase().trim();
    if (!query) return [];
    return this.allBrands.filter(
      b => b.toLowerCase().includes(query) && !this.selectedBrands.some(sb => sb.toLowerCase() === b.toLowerCase())
    );
  }

  savePreferences() {
    this.saveSuccess = true;
    setTimeout(() => {
      this.saveSuccess = false;
    }, 3000);
  }
}
