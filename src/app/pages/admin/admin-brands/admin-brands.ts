import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-admin-brands',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-brands.html',
  styleUrl: './admin-brands.css'
})
export class AdminBrands {
  searchQuery: string = '';
  showAddBrandModal: boolean = false;
  newBrandName: string = '';
  newCategory: string = 'Electronics';

  brands = [
    { id: 1, name: 'Amazon', logo: 'swiggy_box.jpg', category: 'Electronics', status: 'Active', featured: true },
    { id: 2, name: 'Flipkart', logo: 'boat_headphones.png', category: 'Electronics', status: 'Active', featured: true },
    { id: 3, name: 'Myntra', logo: 'myntra_fashion.jpg', category: 'Fashion', status: 'Active', featured: true },
    { id: 4, name: 'Croma', logo: 'smart_home.png', category: 'Electronics', status: 'Active', featured: false },
    { id: 5, name: 'Reliance Digital', logo: 'smartwatch_deal.jpg', category: 'Electronics', status: 'Active', featured: false },
    { id: 6, name: 'Apple', logo: 'nike_shoes.png', category: 'Electronics', status: 'Active', featured: true },
    { id: 7, name: 'Samsung', logo: 'puma_shoes.png', category: 'Electronics', status: 'Active', featured: true },
    { id: 8, name: 'Nike', logo: 'nike_shoe.png', category: 'Fashion', status: 'Active', featured: true }
  ];

  get filteredBrands() {
    if (!this.searchQuery.trim()) return this.brands;
    return this.brands.filter(b => b.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
  }

  toggleFeatured(brand: any) {
    brand.featured = !brand.featured;
  }

  addBrand() {
    if (this.newBrandName.trim()) {
      this.brands.unshift({
        id: Date.now(),
        name: this.newBrandName,
        logo: 'nike_shoes.png',
        category: this.newCategory,
        status: 'Active',
        featured: false
      });
      this.showAddBrandModal = false;
      this.newBrandName = '';
    }
  }

  deleteBrand(index: number) {
    this.brands.splice(index, 1);
  }
}
