import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MainSidebar } from '../../components/main-sidebar/main-sidebar';
import { Navbar } from '../../components/navbar/navbar';
import { Footer } from '../../components/footer/footer';

interface Deal {
  id: number;
  brand: string;
  discount: string;
  title: string;
  price: string;
  originalPrice: string;
  image: string;
}

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink, MainSidebar, Navbar, Footer],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, OnDestroy {
  constructor(private cdr: ChangeDetectorRef) {}

  headerSecondsLeft = 2 * 3600 + 14 * 60 + 22;
  headerTimerString = '02 : 14 : 22';

  deals: Deal[] = [
    { id: 1, brand: 'Nike', discount: '60% OFF', title: "Men's Running Shoes", price: '₹2,399', originalPrice: '₹5,999', image: 'nike_shoes.png' },
    { id: 2, brand: 'boAt', discount: '70% OFF', title: 'Airdopes 141', price: '₹1,499', originalPrice: '₹4,999', image: 'boat_headphones.png' },
    { id: 3, brand: 'Myntra', discount: '40% OFF', title: "Women's Denim Jacket", price: '₹1,799', originalPrice: '₹2,999', image: 'myntra_denim.jpg' },
    { id: 4, brand: 'Swiggy', discount: '50% OFF', title: 'Food & Dining Offers', price: '₹250', originalPrice: '₹500', image: 'swiggy_meal.jpg' }
  ];

  trendingDeals: Deal[] = [
    { id: 101, brand: 'Nike Revolution 7', discount: '58% OFF', title: 'Nike Revolution 7', price: '₹2,499', originalPrice: '₹5,999', image: 'nike_shoes.png' },
    { id: 102, brand: 'boAt Airdopes 141', discount: '67% OFF', title: 'boAt Airdopes 141', price: '₹1,299', originalPrice: '₹3,999', image: 'boat_headphones.png' },
    { id: 103, brand: 'Fire-Boltt Phoenix', discount: '44% OFF', title: 'Fire-Boltt Phoenix', price: '₹4,999', originalPrice: '₹8,999', image: 'smart_home.png' },
    { id: 104, brand: 'Adidas Backpack', discount: '55% OFF', title: 'Adidas Backpack', price: '₹999', originalPrice: '₹2,199', image: 'fitness_gear.png' },
    { id: 105, brand: 'Bella Vita Perfume', discount: '50% OFF', title: 'Bella Vita Perfume', price: '₹599', originalPrice: '₹1,199', image: 'myntra_fashion.jpg' }
  ];

  recentlyViewedDeals = [
    { id: 201, title: 'boAt Rockerz 550', price: '₹1,499', originalPrice: '₹3,499', image: 'boat_headphones.png', viewedTime: 'Viewed 2 hours ago' },
    { id: 202, title: 'Nike Air Max', price: '₹4,999', originalPrice: '₹8,999', image: 'nike_shoes.png', viewedTime: 'Viewed 5 hours ago' },
    { id: 203, title: 'Fire-Boltt Ninja', price: '₹1,999', originalPrice: '₹3,999', image: 'smartwatch_deal.jpg', viewedTime: 'Viewed 1 day ago' }
  ];

  recommendedDeals = [
    { id: 301, title: 'HRX Hoodie', price: '₹1,299', originalPrice: '₹2,499', image: 'cat_fashion.jpg' },
    { id: 302, title: 'Lenskart Sunglasses', price: '₹1,799', originalPrice: '₹3,499', image: 'cat_beauty.jpg' },
    { id: 303, title: 'Minimalist Serum', price: '₹599', originalPrice: '₹899', image: 'cat_health.jpg' }
  ];

  currentDealsPage = 0;
  showExpandedCategories = false;

  prevDeals() {
    this.currentDealsPage = (this.currentDealsPage - 1 + 2) % 2;
    this.cdr.detectChanges();
  }

  nextDeals() {
    this.currentDealsPage = (this.currentDealsPage + 1) % 2;
    this.cdr.detectChanges();
  }

  toggleMoreCategories() {
    this.showExpandedCategories = !this.showExpandedCategories;
    this.cdr.detectChanges();
  }

  private intervalId: any;
  private carouselIntervalId: any;
  currentSlide = 0;

  slides = [
    {
      title: 'Big Brands. Bigger Savings.',
      subtitle: 'Up to 80% OFF on 5000+ Deals',
      btnText: 'Explore Deals',
      gradientClass: 'purple-gradient',
      icon: 'bolt',
      badgePrefix: 'UP TO',
      badgePercent: '80%',
      badgeSuffix: 'OFF'
    },
    {
      title: 'Electronics Mega Sale',
      subtitle: 'Flat 40% OFF on Smartphones & Audio',
      btnText: 'Shop Gadgets',
      gradientClass: 'blue-gradient',
      icon: 'phone_iphone',
      badgePrefix: 'FLAT',
      badgePercent: '40%',
      badgeSuffix: 'OFF'
    },
    {
      title: 'Fashion Weekend Bash',
      subtitle: 'Minimum 60% OFF on Clothing & Shoes',
      btnText: 'View Styles',
      gradientClass: 'fashion-gradient',
      icon: 'shopping_bag',
      badgePrefix: 'MIN',
      badgePercent: '60%',
      badgeSuffix: 'OFF'
    }
  ];

  ngOnInit() {
    this.updateTimers();
    this.intervalId = setInterval(() => {
      if (this.headerSecondsLeft > 0) {
        this.headerSecondsLeft--;
      }
      this.updateTimers();
    }, 1000);

    this.carouselIntervalId = setInterval(() => {
      this.nextSlide();
    }, 4000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    if (this.carouselIntervalId) {
      clearInterval(this.carouselIntervalId);
    }
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    this.cdr.detectChanges();
  }

  setSlide(index: number) {
    this.currentSlide = index;
    this.cdr.detectChanges();
    if (this.carouselIntervalId) {
      clearInterval(this.carouselIntervalId);
    }
    this.carouselIntervalId = setInterval(() => {
      this.nextSlide();
    }, 4000);
  }

  private updateTimers() {
    this.headerTimerString = this.formatTime(this.headerSecondsLeft);
    this.cdr.detectChanges();
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

