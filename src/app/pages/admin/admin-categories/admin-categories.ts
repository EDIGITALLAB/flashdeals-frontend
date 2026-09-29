import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-admin-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-categories.html',
  styleUrl: './admin-categories.css'
})
export class AdminCategories {
  searchQuery: string = '';
  showAddModal: boolean = false;
  newCategoryName: string = '';
  newParentCategory: string = 'None';
  newIcon: string = '🛍️';

  categories = [
    { id: 1, name: 'Electronics', icon: '💻', parent: '-', status: 'Active', order: 1 },
    { id: 2, name: 'Mobiles & Tablets', icon: '📱', parent: 'Electronics', status: 'Active', order: 2 },
    { id: 3, name: 'Laptops', icon: '💻', parent: 'Electronics', status: 'Active', order: 3 },
    { id: 4, name: 'Fashion', icon: '👗', parent: '-', status: 'Active', order: 4 },
    { id: 5, name: "Men's Fashion", icon: '👔', parent: 'Fashion', status: 'Active', order: 5 },
    { id: 6, name: "Women's Fashion", icon: '👠', parent: 'Fashion', status: 'Active', order: 6 },
    { id: 7, name: 'Home & Living', icon: '🏠', parent: '-', status: 'Active', order: 7 },
    { id: 8, name: 'Kitchen & Dining', icon: '🍳', parent: 'Home & Living', status: 'Active', order: 8 }
  ];

  get filteredCategories() {
    if (!this.searchQuery.trim()) return this.categories;
    return this.categories.filter(c => c.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
  }

  addCategory() {
    if (this.newCategoryName.trim()) {
      this.categories.push({
        id: Date.now(),
        name: this.newCategoryName,
        icon: this.newIcon,
        parent: this.newParentCategory === 'None' ? '-' : this.newParentCategory,
        status: 'Active',
        order: this.categories.length + 1
      });
      this.showAddModal = false;
      this.newCategoryName = '';
    }
  }

  deleteCategory(index: number) {
    this.categories.splice(index, 1);
  }
}
