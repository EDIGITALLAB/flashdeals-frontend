import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Breadcrumb } from '../../components/breadcrumb/breadcrumb';
import { Navbar } from '../../components/navbar/navbar';

export interface DealProduct {
  id: number;
  name: string;
  category: string;
  brand: string;
  storeName: string;
  storeAddress: string;
  storeCity: string;
  storePhone: string;
  storeTimings: string;
  storeDistance: string;
  storeRating: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviewsCount: number;
  storeReviewsCount: number;
  couponCode: string;
  images: string[];
  availableSizes: string[];
  sizeStockMap: { [key: string]: number };
  totalStockLeft: number;
  totalInitialStock: number;
  stockStatusText: string;
  stockBadgeColor: string;
  storeLat: number;
  storeLng: number;
}

@Component({
  selector: 'app-deal-details',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, Breadcrumb, Navbar],
  templateUrl: './deal-details.html',
  styleUrl: './deal-details.css',
})
export class DealDetails implements OnInit, OnDestroy {
  productsCatalog: { [key: number]: DealProduct } = {
    1: {
      id: 1,
      name: "Nike Revolution 6 Men's Running Shoes",
      category: "Men's Running Shoes",
      brand: "Nike Store",
      storeName: "Nike Exclusive Store - Indiranagar",
      storeAddress: "Shop No. 42, 100 Feet Road, Near Metro Station, Indiranagar, Bengaluru - 560038",
      storeCity: "Bengaluru",
      storePhone: "+91 98765 43210",
      storeTimings: "10:00 AM - 09:30 PM (Mon - Sun)",
      storeDistance: "1.2 km away",
      storeRating: "4.8 ★",
      price: 2099,
      originalPrice: 4695,
      discount: 55,
      rating: 4.4,
      reviewsCount: 2347,
      storeReviewsCount: 420,
      couponCode: "NIKE55OFF",
      images: ['/nike_shoe.png', '/nike_shoes.png', '/adidas_shoe.png', '/puma_shoe.png', '/skechers_shoe.png'],
      availableSizes: ['6', '7', '8', '9', '10', '11'],
      sizeStockMap: { '6': 1, '7': 0, '8': 2, '9': 1, '10': 0, '11': 0 },
      totalStockLeft: 4,
      totalInitialStock: 20,
      stockStatusText: "🔥 High Demand: Only 4 Units Left in Store!",
      stockBadgeColor: "urgent",
      storeLat: 12.9784,
      storeLng: 77.6408
    },
    2: {
      id: 2,
      name: "Adidas Ultraboost 22 Running Shoes",
      category: "Performance Running Shoes",
      brand: "Adidas Store",
      storeName: "Adidas Performance Hub - Koramangala",
      storeAddress: "Plot 15, 80 Feet Road, 4th Block, Koramangala, Bengaluru - 560034",
      storeCity: "Bengaluru",
      storePhone: "+91 98765 12345",
      storeTimings: "10:00 AM - 09:00 PM (Mon - Sun)",
      storeDistance: "2.5 km away",
      storeRating: "4.9 ★",
      price: 8999,
      originalPrice: 17999,
      discount: 50,
      rating: 4.6,
      reviewsCount: 1840,
      storeReviewsCount: 610,
      couponCode: "ADI50OFF",
      images: ['/adidas_shoe.png', '/adidas_shoes.png', '/nike_shoe.png', '/puma_shoe.png'],
      availableSizes: ['7', '8', '9', '10'],
      sizeStockMap: { '7': 2, '8': 3, '9': 1, '10': 1 },
      totalStockLeft: 7,
      totalInitialStock: 25,
      stockStatusText: "⚡ Hot Deal: 7 Units Left in Store!",
      stockBadgeColor: "medium",
      storeLat: 12.9352,
      storeLng: 77.6245
    },
    3: {
      id: 3,
      name: "Puma Smashic v2 Sneakers",
      category: "Casual Lifestyle Sneakers",
      brand: "Puma Store",
      storeName: "Puma Flagship Store - MG Road",
      storeAddress: "Shop 101, MG Road Promenade, Near Trinity Metro, Bengaluru - 560001",
      storeCity: "Bengaluru",
      storePhone: "+91 98765 67890",
      storeTimings: "10:30 AM - 09:30 PM (Mon - Sun)",
      storeDistance: "3.1 km away",
      storeRating: "4.7 ★",
      price: 1599,
      originalPrice: 3999,
      discount: 60,
      rating: 4.3,
      reviewsCount: 950,
      storeReviewsCount: 310,
      couponCode: "PUMA60OFF",
      images: ['/puma_shoe.png', '/nike_shoe.png', '/adidas_shoe.png', '/skechers_shoe.png'],
      availableSizes: ['6', '7', '8', '9', '10'],
      sizeStockMap: { '6': 0, '7': 1, '8': 1, '9': 0, '10': 0 },
      totalStockLeft: 2,
      totalInitialStock: 15,
      stockStatusText: "⚠️ Extremely Low Stock: Only 2 Units Left!",
      stockBadgeColor: "urgent",
      storeLat: 12.9756,
      storeLng: 77.6066
    },
    4: {
      id: 4,
      name: "Skechers Go Run Consistent Sneakers",
      category: "Cushioned Walking & Running Shoes",
      brand: "Skechers Store",
      storeName: "Skechers Outlet - Commercial Street",
      storeAddress: "Building 88, Commercial Street, Tasker Town, Bengaluru - 560001",
      storeCity: "Bengaluru",
      storePhone: "+91 98765 99999",
      storeTimings: "10:00 AM - 09:00 PM (Mon - Sun)",
      storeDistance: "4.0 km away",
      storeRating: "4.6 ★",
      price: 2699,
      originalPrice: 5999,
      discount: 55,
      rating: 4.3,
      reviewsCount: 780,
      storeReviewsCount: 250,
      couponCode: "SKECH55OFF",
      images: ['/skechers_shoe.png', '/nike_shoes.png', '/puma_shoe.png', '/adidas_shoe.png'],
      availableSizes: ['6', '7', '8', '9', '10', '11'],
      sizeStockMap: { '6': 2, '7': 2, '8': 3, '9': 1, '10': 1, '11': 0 },
      totalStockLeft: 9,
      totalInitialStock: 30,
      stockStatusText: "✅ In Stock: 9 Units Available in Store",
      stockBadgeColor: "normal",
      storeLat: 12.9822,
      storeLng: 77.6083
    }
  };

  currentProduct: DealProduct = this.productsCatalog[1];
  currentImgIndex = 0;
  secondsLeft = 8076;
  timerInterval: any;

  selectedSize = '8';
  selectedColor = 'Black/White';

  colorOptions = [
    { name: 'Black/White', class: 'color-black' },
    { name: 'Light Grey', class: 'color-grey' },
    { name: 'Royal Blue', class: 'color-blue' },
    { name: 'Pure White', class: 'color-white' },
    { name: 'Olive Green', class: 'color-green' }
  ];

  mapEmbedUrl: SafeResourceUrl | null = null;
  isWishlisted = false;
  showCouponModal = false;
  codeCopied = false;
  activeTab = 'overview';

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const prodId = Number(params['id']) || 1;
      if (this.productsCatalog[prodId]) {
        this.currentProduct = this.productsCatalog[prodId];
      } else {
        this.currentProduct = this.productsCatalog[1];
      }

      this.currentImgIndex = 0;
      this.selectedSize = this.currentProduct.availableSizes[0] || '8';
      this.updateMapUrl();
    });

    this.timerInterval = setInterval(() => {
      if (this.secondsLeft > 0) {
        this.secondsLeft--;
      }
    }, 1000);
  }

  ngOnDestroy() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  updateMapUrl() {
    const embedUrl = `https://maps.google.com/maps?q=${this.currentProduct.storeLat},${this.currentProduct.storeLng}&z=16&output=embed`;
    this.mapEmbedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

  get selectedImage(): string {
    return this.currentProduct.images[this.currentImgIndex] || this.currentProduct.images[0];
  }

  get currentSizeStock(): number {
    return this.currentProduct.sizeStockMap[this.selectedSize] ?? 0;
  }

  get stockPercentage(): number {
    return Math.round((this.currentProduct.totalStockLeft / this.currentProduct.totalInitialStock) * 100);
  }

  prevImg() {
    if (this.currentImgIndex > 0) {
      this.currentImgIndex--;
    } else {
      this.currentImgIndex = this.currentProduct.images.length - 1;
    }
  }

  nextImg() {
    if (this.currentImgIndex < this.currentProduct.images.length - 1) {
      this.currentImgIndex++;
    } else {
      this.currentImgIndex = 0;
    }
  }

  selectImg(index: number) {
    this.currentImgIndex = index;
  }

  selectSize(size: string) {
    this.selectedSize = size;
  }

  selectColor(colorName: string) {
    this.selectedColor = colorName;
  }

  toggleWishlist() {
    this.isWishlisted = !this.isWishlisted;
  }

  claimCoupon() {
    this.showCouponModal = true;
    this.codeCopied = false;
  }

  copyCouponCode() {
    navigator.clipboard.writeText(this.currentProduct.couponCode);
    this.codeCopied = true;
    setTimeout(() => {
      this.codeCopied = false;
    }, 3000);
  }

  closeCouponModal() {
    this.showCouponModal = false;
  }

  openDirections() {
    window.open(`https://maps.google.com/?q=${this.currentProduct.storeLat},${this.currentProduct.storeLng}`, '_blank');
  }

  callStore() {
    window.location.href = `tel:${this.currentProduct.storePhone}`;
  }

  whatsappStore() {
    const msg = encodeURIComponent(`Hi! I am interested in ${this.currentProduct.name} (${this.currentProduct.discount}% OFF) listed on FlashDeals. Is size ${this.selectedSize} currently available in store?`);
    window.open(`https://wa.me/919876543210?text=${msg}`, '_blank');
  }

  getHrs(): string {
    const hrs = Math.floor(this.secondsLeft / 3600);
    return hrs.toString().padStart(2, '0');
  }

  getMins(): string {
    const mins = Math.floor((this.secondsLeft % 3600) / 60);
    return mins.toString().padStart(2, '0');
  }

  getSecs(): string {
    const secs = this.secondsLeft % 60;
    return secs.toString().padStart(2, '0');
  }
}
