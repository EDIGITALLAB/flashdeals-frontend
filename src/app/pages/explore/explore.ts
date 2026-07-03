import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FilterSidebar } from '../../components/filter-sidebar/filter-sidebar';
import { SearchHeader } from '../../components/search-header/search-header';
import { ProductToolbar } from '../../components/product-toolbar/product-toolbar';

interface Product {
  id: number;
  name: string;
  category: string;
  store: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  image: string;
  secondsLeft: number;
  timerString?: string;
}

@Component({
  selector: 'app-explore',
  imports: [CommonModule, FilterSidebar, SearchHeader, ProductToolbar, RouterLink],
  templateUrl: './explore.html',
  styleUrl: './explore.css',
})
export class Explore implements OnInit, OnDestroy {
  products: Product[] = [
    {
      id: 1,
      name: "Nike Revolution 6 Men's Running Shoes",
      category: "Men's Running Shoes",
      store: "Nike Official Store",
      price: 2099,
      originalPrice: 4695,
      discount: 55,
      rating: 4.4,
      image: "/nike_shoe.png",
      secondsLeft: 2 * 3600 + 14 * 60 + 36
    },
    {
      id: 2,
      name: "Adidas Ultraboost 22 Running Shoes",
      category: "Running Shoes",
      store: "Adidas",
      price: 8999,
      originalPrice: 17999,
      discount: 50,
      rating: 4.6,
      image: "/adidas_shoe.png",
      secondsLeft: 3 * 3600 + 20 * 60 + 15
    },
    {
      id: 3,
      name: "Puma Smashic v2 Sneakers",
      category: "Sneakers",
      store: "Puma Store",
      price: 1599,
      originalPrice: 3999,
      discount: 60,
      rating: 4.3,
      image: "/puma_shoe.png",
      secondsLeft: 4 * 3600 + 10 * 60 + 5
    },
    {
      id: 4,
      name: "Skechers Go Run Consistent Sneakers",
      category: "Consistent Sneakers",
      store: "Skechers",
      price: 2699,
      originalPrice: 5999,
      discount: 55,
      rating: 4.3,
      image: "/skechers_shoe.png",
      secondsLeft: 1 * 3600 + 50 * 60 + 33
    }
  ];

  private intervalId: any;

  ngOnInit() {
    this.updateTimers();
    this.intervalId = setInterval(() => {
      this.products.forEach(p => {
        if (p.secondsLeft > 0) {
          p.secondsLeft--;
        }
      });
      this.updateTimers();
    }, 1000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private updateTimers() {
    this.products.forEach(p => {
      p.timerString = this.formatTime(p.secondsLeft);
    });
  }

  private formatTime(totalSeconds: number): string {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${this.pad(hrs)} : ${this.pad(mins)} : ${this.pad(secs)}`;
  }

  private pad(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

  getTimeSegments(timerString: string | undefined): string[] {
    if (!timerString) return ['00', '00', '00'];
    return timerString.split(' : ');
  }
}
