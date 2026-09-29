import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-admin-manage-deals',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admin-manage-deals.html',
  styleUrl: './admin-manage-deals.css'
})
export class AdminManageDeals {
  searchQuery: string = '';
  statusFilter: string = 'All Status';

  deals = [
    { id: 1, title: 'Nike Revolution 6', brand: 'Nike', category: 'Fashion', price: '₹4,999', originalPrice: '₹7,999', discount: '37% OFF', status: 'Active', clicks: 1420 },
    { id: 2, title: 'iPhone 15 (256GB)', brand: 'Apple', category: 'Electronics', price: '₹67,999', originalPrice: '₹79,999', discount: '15% OFF', status: 'Active', clicks: 3890 },
    { id: 3, title: 'boAt Airdopes 141', brand: 'boAt', category: 'Electronics', price: '₹1,299', originalPrice: '₹3,999', discount: '67% OFF', status: 'Active', clicks: 2150 },
    { id: 4, title: 'Samsung 55" 4K Smart TV', brand: 'Samsung', category: 'Electronics', price: '₹42,999', originalPrice: '₹64,999', discount: '33% OFF', status: 'Scheduled', clicks: 840 },
    { id: 5, title: 'Puma Running Shoes', brand: 'Puma', category: 'Fashion', price: '₹2,199', originalPrice: '₹4,999', discount: '56% OFF', status: 'Draft', clicks: 0 }
  ];

  get filteredDeals() {
    return this.deals.filter(d => {
      const matchesSearch = d.title.toLowerCase().includes(this.searchQuery.toLowerCase()) || d.brand.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesStatus = this.statusFilter === 'All Status' || d.status === this.statusFilter;
      return matchesSearch && matchesStatus;
    });
  }

  deleteDeal(index: number) {
    this.deals.splice(index, 1);
  }
}
