import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MainSidebar } from '../../components/main-sidebar/main-sidebar';
import { Navbar } from '../../components/navbar/navbar';

interface Deal {
  id: number;
  brand: string;
  logoType: 'puma' | 'boat' | 'myntra' | 'swiggy' | 'nike' | 'samsung' | 'adidas' | 'kfc';
  discount: string;
  storeName: string;
  status: 'Online' | 'Offline';
  secondsLeft: number;
  timerString?: string;
}

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink, MainSidebar, Navbar],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, OnDestroy {
  constructor(private cdr: ChangeDetectorRef) {}
  deals: Deal[] = [
    { id: 1, brand: 'Puma', logoType: 'puma', discount: 'Min. 60% Off', storeName: 'Puma Store', status: 'Online', secondsLeft: 2 * 3600 + 14 * 60 + 36 },
    { id: 2, brand: 'boAt', logoType: 'boat', discount: 'Up to 70% Off', storeName: 'boAt Lifestyle', status: 'Online', secondsLeft: 4 * 3600 + 30 * 60 + 12 },
    { id: 3, brand: 'Myntra', logoType: 'myntra', discount: '40-80% Off', storeName: 'Myntra Fashion', status: 'Online', secondsLeft: 5 * 3600 + 45 * 60 + 22 },
    { id: 4, brand: 'Swiggy', logoType: 'swiggy', discount: 'Flat 50% Off', storeName: 'On Food Orders', status: 'Online', secondsLeft: 1 * 3600 + 10 * 60 + 5 },
    { id: 5, brand: 'Nike', logoType: 'nike', discount: 'Min. 40% Off', storeName: 'Nike Store', status: 'Online', secondsLeft: 3 * 3600 + 15 * 60 + 0 },
    { id: 6, brand: 'Samsung', logoType: 'samsung', discount: 'Up to 30% Off', storeName: 'Samsung Café', status: 'Online', secondsLeft: 6 * 3600 + 45 * 60 + 0 },
    { id: 7, brand: 'Adidas', logoType: 'adidas', discount: '30-60% Off', storeName: 'Adidas Originals', status: 'Online', secondsLeft: 2 * 3600 + 20 * 60 + 0 },
    { id: 8, brand: 'KFC', logoType: 'kfc', discount: 'Flat 20% Off', storeName: 'KFC Delivery', status: 'Online', secondsLeft: 1 * 3600 + 50 * 60 + 0 }
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
      this.deals.forEach(deal => {
        if (deal.secondsLeft > 0) {
          deal.secondsLeft--;
        }
      });
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
    this.deals.forEach(deal => {
      deal.timerString = this.formatTime(deal.secondsLeft);
    });
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

