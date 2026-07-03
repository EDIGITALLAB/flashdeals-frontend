import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface DealItem {
  id: number;
  type: 'product' | 'coupon';
  title: string;
  image?: string;
  logoType?: 'myntra' | 'swiggy' | 'boat' | 'puma';
  priceCurrent?: number;
  priceOriginal?: number;
  discount?: string;
  secondsLeft?: number;
  timerString?: string;
  hasButton?: boolean;
  buttonText?: string;
  storeName?: string;
  purchasedDate?: string;
  orderId?: string;
  statusText?: string;
}

@Component({
  selector: 'app-my-deals-followups',
  imports: [CommonModule, RouterLink],
  templateUrl: './my-deals-followups.html',
  styleUrl: './my-deals-followups.css',
})
export class MyDealsFollowups implements OnInit, OnDestroy {
  activeTab: 'watching' | 'purchased' | 'expired' = 'watching';
  private intervalId: any;

  watchingDeals: DealItem[] = [
    {
      id: 1,
      type: 'product',
      title: "Nike Revolution 6 Men's Running Shoes",
      image: '/nike_shoe.png',
      priceCurrent: 2099,
      priceOriginal: 4695,
      discount: '55% OFF',
      secondsLeft: 2 * 3600 + 14 * 60 + 36, // 02:14:36
    },
    {
      id: 2,
      type: 'product',
      title: 'boAt Rockerz 450 Wireless Headphones',
      image: '/boat_headphones.png',
      priceCurrent: 1499,
      priceOriginal: 2999,
      discount: '50% OFF',
      secondsLeft: 4 * 3600 + 30 * 60 + 12, // 04:30:12
    },
    {
      id: 3,
      type: 'coupon',
      title: 'Myntra Fashion Bonanza 40-80% Off',
      logoType: 'myntra',
      hasButton: true,
      buttonText: 'View Deal',
      secondsLeft: 5 * 3600 + 45 * 60 + 22, // 05:45:22
    },
    {
      id: 4,
      type: 'coupon',
      title: 'Swiggy Flat 50% Off on Food Orders',
      logoType: 'swiggy',
      hasButton: true,
      buttonText: 'View Deal',
      secondsLeft: 1 * 3600 + 10 * 60 + 5, // 01:10:05
    },
    {
      id: 5,
      type: 'product',
      title: 'Adidas Ultraboost 22 Running Shoes',
      image: '/adidas_shoe.png',
      priceCurrent: 8099,
      priceOriginal: 12999,
      discount: '37% OFF',
      secondsLeft: 3 * 3600 + 20 * 60 + 15, // 03:20:15
    }
  ];

  purchasedDeals: DealItem[] = [
    {
      id: 101,
      type: 'product',
      title: "Puma Comet Evo Men's Running Shoes",
      image: '/puma_shoe.png',
      priceCurrent: 1899,
      priceOriginal: 3999,
      discount: '52% OFF',
      purchasedDate: 'June 28, 2026',
      orderId: 'FD-983120-X',
      statusText: 'Delivered'
    },
    {
      id: 102,
      type: 'product',
      title: "Skechers Dynamight Athletic Training Shoes",
      image: '/skechers_shoe.png',
      priceCurrent: 2499,
      priceOriginal: 4999,
      discount: '50% OFF',
      purchasedDate: 'June 25, 2026',
      orderId: 'FD-774211-P',
      statusText: 'Delivered'
    },
    {
      id: 103,
      type: 'coupon',
      title: 'Swiggy Flat 50% Off Coupon Code',
      logoType: 'swiggy',
      purchasedDate: 'July 01, 2026',
      orderId: 'FD-103290-S',
      statusText: 'Claimed'
    }
  ];

  expiredDeals: DealItem[] = [
    {
      id: 201,
      type: 'product',
      title: "Puma Wired Run Sneakers",
      image: '/puma_shoes.png',
      priceCurrent: 1599,
      priceOriginal: 3199,
      discount: '50% OFF',
      statusText: 'Expired June 30'
    },
    {
      id: 202,
      type: 'coupon',
      title: 'Myntra Weekend Splurge 30% Off',
      logoType: 'myntra',
      statusText: 'Expired July 02'
    }
  ];

  ngOnInit() {
    this.updateTimers();
    this.intervalId = setInterval(() => {
      this.watchingDeals.forEach(deal => {
        if (deal.secondsLeft && deal.secondsLeft > 0) {
          deal.secondsLeft--;
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
    this.watchingDeals.forEach(deal => {
      if (deal.secondsLeft !== undefined) {
        deal.timerString = this.formatTime(deal.secondsLeft);
      }
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

  setActiveTab(tab: 'watching' | 'purchased' | 'expired') {
    this.activeTab = tab;
  }
}
