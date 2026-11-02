import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Navbar } from '../../components/navbar/navbar';
import { MainSidebar } from '../../components/main-sidebar/main-sidebar';

export interface StoreItem {
  id: number;
  name: string;
  category: string;
  rating: number;
  reviewsCount: number;
  distance: string;
  locality: string;
  address: string;
  phone: string;
  openTimings: string;
  activeDealsCount: number;
  featuredOffer: string;
  image: string;
  verified: boolean;
}

@Component({
  selector: 'app-stores',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, Navbar, MainSidebar],
  templateUrl: './stores.html',
  styleUrl: './stores.css'
})
export class Stores implements OnInit {
  searchQuery: string = '';
  selectedCategory: string = 'All';
  selectedSort: string = 'popular';

  categories: string[] = [
    'All',
    'Fashion & Apparel',
    'Electronics & Audio',
    'Groceries & Household',
    'Restaurants & Cafes',
    'Salon, Spa & Beauty',
    'Footwear & Accessories'
  ];

  allStores: StoreItem[] = [
    {
      id: 1,
      name: 'Adidas Performance Hub',
      category: 'Footwear & Accessories',
      rating: 4.9,
      reviewsCount: 184,
      distance: '1.2 km away',
      locality: 'Koramangala, Bengaluru',
      address: 'Plot 15, 80 Feet Road, 4th Block, Koramangala',
      phone: '+91 98765 43210',
      openTimings: '10:00 AM - 09:30 PM',
      activeDealsCount: 14,
      featuredOffer: 'Flat 50% OFF In-Store Deals',
      image: 'adidas_shoe.png',
      verified: true
    },
    {
      id: 2,
      name: 'boAt Experience Centre',
      category: 'Electronics & Audio',
      rating: 4.8,
      reviewsCount: 312,
      distance: '2.5 km away',
      locality: 'Indiranagar, Bengaluru',
      address: '100 Feet Road, Opposite Metro Station, Indiranagar',
      phone: '+91 98765 11223',
      openTimings: '10:30 AM - 09:00 PM',
      activeDealsCount: 22,
      featuredOffer: 'Up to 70% OFF Flash Coupon',
      image: 'boat_headphones.png',
      verified: true
    },
    {
      id: 3,
      name: 'Royal Fashion Superstore',
      category: 'Fashion & Apparel',
      rating: 4.7,
      reviewsCount: 96,
      distance: '0.8 km away',
      locality: 'MG Road, Bengaluru',
      address: 'Shop No 42, Commercial Plaza, MG Road',
      phone: '+91 98765 99887',
      openTimings: '11:00 AM - 10:00 PM',
      activeDealsCount: 18,
      featuredOffer: 'Buy 1 Get 1 Free on Wearables',
      image: 'myntra_fashion.jpg',
      verified: true
    },
    {
      id: 4,
      name: 'City Supermarket Hub',
      category: 'Groceries & Household',
      rating: 4.9,
      reviewsCount: 420,
      distance: '1.5 km away',
      locality: 'HSR Layout, Bengaluru',
      address: 'Sector 3, 27th Main Road, HSR Layout',
      phone: '+91 98765 77665',
      openTimings: '08:00 AM - 10:30 PM',
      activeDealsCount: 35,
      featuredOffer: 'Flat ₹300 OFF Coupon',
      image: 'swiggy_meal.jpg',
      verified: true
    },
    {
      id: 5,
      name: 'Nike Flagship Store',
      category: 'Footwear & Accessories',
      rating: 4.9,
      reviewsCount: 250,
      distance: '3.1 km away',
      locality: 'Brigade Road, Bengaluru',
      address: 'No. 88, Brigade Road, Ashok Nagar',
      phone: '+91 98765 33445',
      openTimings: '10:00 AM - 09:30 PM',
      activeDealsCount: 16,
      featuredOffer: 'Flat 40% OFF Nike Running Series',
      image: 'nike_shoes.png',
      verified: true
    },
    {
      id: 6,
      name: 'Puma Exclusive Outlet',
      category: 'Footwear & Accessories',
      rating: 4.6,
      reviewsCount: 110,
      distance: '2.0 km away',
      locality: 'Jayanagar 4th Block, Bengaluru',
      address: '11th Main Rd, 4th Block, Jayanagar',
      phone: '+91 98765 55667',
      openTimings: '10:30 AM - 09:00 PM',
      activeDealsCount: 11,
      featuredOffer: 'Up to 60% OFF Seasonal Sale',
      image: 'puma_shoe.png',
      verified: true
    }
  ];

  constructor(private router: Router) {}

  ngOnInit() {}

  get filteredStores(): StoreItem[] {
    return this.allStores.filter(store => {
      const matchesCategory = this.selectedCategory === 'All' || store.category.toLowerCase().includes(this.selectedCategory.toLowerCase());
      const matchesSearch = !this.searchQuery || 
        store.name.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
        store.locality.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        store.category.toLowerCase().includes(this.searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (this.selectedSort === 'rating') return b.rating - a.rating;
      if (this.selectedSort === 'deals') return b.activeDealsCount - a.activeDealsCount;
      return 0; // default popular
    });
  }

  selectCategory(cat: string) {
    this.selectedCategory = cat;
  }

  openDirections(store: StoreItem, event: MouseEvent) {
    event.stopPropagation();
    const query = encodeURIComponent(`${store.name}, ${store.locality}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  }

  callStore(phone: string, event: MouseEvent) {
    event.stopPropagation();
    window.open(`tel:${phone}`, '_self');
  }
}
