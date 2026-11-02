import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Navbar } from '../../components/navbar/navbar';
import { MainSidebar } from '../../components/main-sidebar/main-sidebar';

export interface StoreDeal {
  id: number;
  title: string;
  category: string;
  originalPrice: number;
  discountPrice: number;
  discountPercent: string;
  couponCode: string;
  expiresIn: string;
  image: string;
  unitsLeft: number;
}

export interface StoreDetailData {
  id: number;
  name: string;
  category: string;
  rating: number;
  reviewsCount: number;
  distance: string;
  address: string;
  locality: string;
  city: string;
  pincode: string;
  phone: string;
  openTimings: string;
  workingDays: string;
  verified: boolean;
  coverImage: string;
  logoImage: string;
  description: string;
  amenities: string[];
  lat: number;
  lng: number;
  deals: StoreDeal[];
}

@Component({
  selector: 'app-store-details',
  standalone: true,
  imports: [CommonModule, RouterLink, Navbar, MainSidebar],
  templateUrl: './store-details.html',
  styleUrl: './store-details.css'
})
export class StoreDetails implements OnInit {
  storeId: number = 1;
  currentStore!: StoreDetailData;
  mapEmbedUrl: SafeResourceUrl | null = null;
  activeTab: string = 'deals'; // 'deals', 'about', 'reviews'

  // Modal State for Coupon Claiming
  showCouponModal: boolean = false;
  selectedDeal: StoreDeal | null = null;
  codeCopied: boolean = false;

  allStoresData: Record<number, StoreDetailData> = {
    1: {
      id: 1,
      name: 'Adidas Performance Hub',
      category: 'Footwear & Accessories',
      rating: 4.9,
      reviewsCount: 184,
      distance: '1.2 km away',
      address: 'Plot 15, 80 Feet Road, 4th Block, Koramangala',
      locality: 'Koramangala',
      city: 'Bengaluru',
      pincode: '560034',
      phone: '+91 98765 43210',
      openTimings: '10:00 AM - 09:30 PM',
      workingDays: 'Mon - Sun (All Days)',
      verified: true,
      coverImage: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=1200&q=80',
      logoImage: 'adidas_shoe.png',
      description: 'Official Adidas Performance Store in Koramangala. Discover authentic running shoes, gym apparel, and sports accessories with exclusive in-store FlashDeals discount coupons.',
      amenities: ['100% Original Products', 'Trial Rooms Available', 'AC Showroom', 'Instant Coupon Billing', 'Card & UPI Accepted'],
      lat: 12.9352,
      lng: 77.6245,
      deals: [
        {
          id: 2,
          title: 'Adidas Ultraboost 22 Running Shoes',
          category: 'Footwear',
          originalPrice: 17999,
          discountPrice: 8999,
          discountPercent: '50% OFF',
          couponCode: 'ADI-ULTRA50',
          expiresIn: '02h : 14m : 23s',
          image: 'adidas_shoe.png',
          unitsLeft: 7
        },
        {
          id: 101,
          title: 'Adidas Essential Fleece Hoodie',
          category: 'Apparel',
          originalPrice: 4999,
          discountPrice: 2499,
          discountPercent: '50% OFF',
          couponCode: 'ADI-HOODIE50',
          expiresIn: '05h : 30m : 00s',
          image: 'cat_fashion.jpg',
          unitsLeft: 12
        },
        {
          id: 102,
          title: 'Adidas Unisex Training Gym Backpack',
          category: 'Accessories',
          originalPrice: 2199,
          discountPrice: 999,
          discountPercent: '55% OFF',
          couponCode: 'ADI-BAG55',
          expiresIn: '1 day left',
          image: 'fitness_gear.png',
          unitsLeft: 15
        }
      ]
    },
    2: {
      id: 2,
      name: 'boAt Experience Centre',
      category: 'Electronics & Audio',
      rating: 4.8,
      reviewsCount: 312,
      distance: '2.5 km away',
      address: '100 Feet Road, Opposite Metro Station, Indiranagar',
      locality: 'Indiranagar',
      city: 'Bengaluru',
      pincode: '560038',
      phone: '+91 98765 11223',
      openTimings: '10:30 AM - 09:00 PM',
      workingDays: 'Mon - Sun (All Days)',
      verified: true,
      coverImage: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=80',
      logoImage: 'boat_headphones.png',
      description: 'Experience boat audio products live at our Indiranagar Flagship Experience Store. Try headphones, Airdopes, and smartwatches in person with instant store coupons.',
      amenities: ['Live Product Demo', 'Warranty Assistance', 'Card & UPI Accepted', 'Instant Coupon Billing'],
      lat: 12.9784,
      lng: 77.6408,
      deals: [
        {
          id: 31,
          title: 'boAt Airdopes 141 True Wireless Earbuds',
          category: 'Audio',
          originalPrice: 4999,
          discountPrice: 1499,
          discountPercent: '70% OFF',
          couponCode: 'BOAT-AIR70',
          expiresIn: '04h : 20m : 10s',
          image: 'boat_headphones.png',
          unitsLeft: 20
        },
        {
          id: 32,
          title: 'boAt Rockerz 550 Over-Ear Headphones',
          category: 'Audio',
          originalPrice: 3999,
          discountPrice: 1699,
          discountPercent: '57% OFF',
          couponCode: 'BOAT-ROCK57',
          expiresIn: '12h left',
          image: 'boat_headphones.png',
          unitsLeft: 9
        }
      ]
    },
    3: {
      id: 3,
      name: 'Royal Fashion Superstore',
      category: 'Fashion & Apparel',
      rating: 4.7,
      reviewsCount: 96,
      distance: '0.8 km away',
      address: 'Shop No 42, Commercial Plaza, MG Road',
      locality: 'MG Road',
      city: 'Bengaluru',
      pincode: '560001',
      phone: '+91 98765 99887',
      openTimings: '11:00 AM - 10:00 PM',
      workingDays: 'Mon - Sun (All Days)',
      verified: true,
      coverImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
      logoImage: 'myntra_fashion.jpg',
      description: 'Premium Multi-Brand Fashion Outlet on MG Road. Top clothing brands, western wear, ethnic wear, and footwear under one roof with Buy 1 Get 1 & Flat discount coupons.',
      amenities: ['Multi-Brand Fashion', 'Trial Rooms', 'AC Store', 'Valet Parking'],
      lat: 12.9756,
      lng: 77.6066,
      deals: [
        {
          id: 33,
          title: "Women's Designer Denim Jacket & Top",
          category: 'Fashion',
          originalPrice: 2999,
          discountPrice: 1799,
          discountPercent: '40% OFF',
          couponCode: 'ROYAL-DENIM40',
          expiresIn: '08h left',
          image: 'myntra_denim.jpg',
          unitsLeft: 8
        },
        {
          id: 331,
          title: "Men's Slim Fit Casual Cotton Shirt",
          category: 'Fashion',
          originalPrice: 1999,
          discountPrice: 999,
          discountPercent: '50% OFF',
          couponCode: 'ROYAL-SHIRT50',
          expiresIn: '1 day left',
          image: 'cat_fashion.jpg',
          unitsLeft: 14
        },
        {
          id: 332,
          title: 'Buy 1 Get 1 Free on All Western Wearables',
          category: 'BOGO Coupon',
          originalPrice: 3999,
          discountPrice: 1999,
          discountPercent: 'BOGO FREE',
          couponCode: 'ROYAL-BOGO',
          expiresIn: 'Limited Period',
          image: 'myntra_fashion.jpg',
          unitsLeft: 25
        }
      ]
    },
    4: {
      id: 4,
      name: 'City Supermarket Hub',
      category: 'Groceries & Household',
      rating: 4.9,
      reviewsCount: 420,
      distance: '1.5 km away',
      address: 'Sector 3, 27th Main Road, HSR Layout',
      locality: 'HSR Layout',
      city: 'Bengaluru',
      pincode: '560102',
      phone: '+91 98765 77665',
      openTimings: '08:00 AM - 10:30 PM',
      workingDays: 'Everyday (All Days)',
      verified: true,
      coverImage: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=1200&q=80',
      logoImage: 'swiggy_meal.jpg',
      description: 'Your neighborhood mega grocery and daily essentials market in HSR Layout. Save extra on monthly ration, fresh fruits, vegetables, and household items.',
      amenities: ['Fresh Groceries', 'Free Home Delivery', 'Parking Available', 'UPI Accepted'],
      lat: 12.9116,
      lng: 77.6389,
      deals: [
        {
          id: 34,
          title: 'Flat ₹300 OFF on Household & Grocery Bill ₹1500+',
          category: 'Grocery',
          originalPrice: 1500,
          discountPrice: 1200,
          discountPercent: '₹300 OFF',
          couponCode: 'CITY-GROC300',
          expiresIn: 'Continuous Offer',
          image: 'swiggy_meal.jpg',
          unitsLeft: 50
        },
        {
          id: 341,
          title: 'Extra 25% OFF Premium Dry Fruits & Nuts Combo Pack',
          category: 'Essentials',
          originalPrice: 1200,
          discountPrice: 899,
          discountPercent: '25% OFF',
          couponCode: 'CITY-NUTS25',
          expiresIn: '3 days left',
          image: 'cat_health.jpg',
          unitsLeft: 30
        }
      ]
    },
    5: {
      id: 5,
      name: 'Nike Flagship Store',
      category: 'Footwear & Accessories',
      rating: 4.9,
      reviewsCount: 250,
      distance: '3.1 km away',
      address: 'No. 88, Brigade Road, Ashok Nagar',
      locality: 'Brigade Road',
      city: 'Bengaluru',
      pincode: '560025',
      phone: '+91 98765 33445',
      openTimings: '10:00 AM - 09:30 PM',
      workingDays: 'Mon - Sun',
      verified: true,
      coverImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',
      logoImage: 'nike_shoes.png',
      description: 'Nike Official Store on Brigade Road. Latest Air Max, Revolution 7, and Pegasus running shoes with exclusive in-store coupon redemption.',
      amenities: ['Official Nike Store', 'Gait Analysis', 'Trial Track', 'UPI & Cards'],
      lat: 12.9716,
      lng: 77.6070,
      deals: [
        {
          id: 35,
          title: 'Nike Revolution 7 Men Running Shoes',
          category: 'Footwear',
          originalPrice: 5999,
          discountPrice: 2399,
          discountPercent: '60% OFF',
          couponCode: 'NIKE-REV60',
          expiresIn: '03h : 10m : 00s',
          image: 'nike_shoes.png',
          unitsLeft: 5
        },
        {
          id: 351,
          title: 'Nike Air Max Excee Performance Sneakers',
          category: 'Footwear',
          originalPrice: 8999,
          discountPrice: 4999,
          discountPercent: '45% OFF',
          couponCode: 'NIKE-AIR45',
          expiresIn: '1 day left',
          image: 'nike_shoes.png',
          unitsLeft: 9
        },
        {
          id: 352,
          title: 'Nike Dri-FIT Sportswear Fitness Tee',
          category: 'Apparel',
          originalPrice: 1995,
          discountPrice: 1299,
          discountPercent: '35% OFF',
          couponCode: 'NIKE-TEE35',
          expiresIn: '2 days left',
          image: 'fitness_gear.png',
          unitsLeft: 18
        }
      ]
    },
    6: {
      id: 6,
      name: 'Puma Exclusive Outlet',
      category: 'Footwear & Accessories',
      rating: 4.6,
      reviewsCount: 110,
      distance: '2.0 km away',
      address: '11th Main Rd, 4th Block, Jayanagar',
      locality: 'Jayanagar',
      city: 'Bengaluru',
      pincode: '560011',
      phone: '+91 98765 55667',
      openTimings: '10:30 AM - 09:00 PM',
      workingDays: 'Mon - Sun',
      verified: true,
      coverImage: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1200&q=80',
      logoImage: 'puma_shoe.png',
      description: 'Exclusive Puma Store Jayanagar. Sneakerheads favorite spot for Smashic, Nitro, and RS-X sneakers with instant coupon discounts.',
      amenities: ['Authentic Puma', 'Sneaker Care', 'AC Store', 'UPI & Cards'],
      lat: 12.9299,
      lng: 77.5826,
      deals: [
        {
          id: 36,
          title: 'Puma Smashic v2 Casual Sneakers',
          category: 'Footwear',
          originalPrice: 3999,
          discountPrice: 1599,
          discountPercent: '60% OFF',
          couponCode: 'PUMA-SMASH60',
          expiresIn: '06h left',
          image: 'puma_shoe.png',
          unitsLeft: 2
        },
        {
          id: 361,
          title: 'Puma Challenger Sports Duffle Bag',
          category: 'Accessories',
          originalPrice: 2399,
          discountPrice: 1199,
          discountPercent: '50% OFF',
          couponCode: 'PUMA-BAG50',
          expiresIn: '1 day left',
          image: 'fitness_gear.png',
          unitsLeft: 10
        }
      ]
    }
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const id = params['id'] ? parseInt(params['id']) : 1;
      this.storeId = id;
      this.loadStoreData(id);
    });
  }

  loadStoreData(id: number) {
    if (this.allStoresData[id]) {
      this.currentStore = this.allStoresData[id];
    } else {
      this.currentStore = this.allStoresData[1]; // fallback
    }

    const embedUrl = `https://maps.google.com/maps?q=${this.currentStore.lat},${this.currentStore.lng}&z=15&output=embed`;
    this.mapEmbedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

  openDirections() {
    const query = encodeURIComponent(`${this.currentStore.name}, ${this.currentStore.address}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  }

  callStore() {
    window.open(`tel:${this.currentStore.phone}`, '_self');
  }

  whatsappStore() {
    const msg = encodeURIComponent(`Hi ${this.currentStore.name}, I am interested in your FlashDeals store offers!`);
    window.open(`https://wa.me/${this.currentStore.phone.replace(/[^0-9]/g, '')}?text=${msg}`, '_blank');
  }

  claimCoupon(deal: StoreDeal) {
    this.selectedDeal = deal;
    this.showCouponModal = true;
    this.codeCopied = false;
  }

  closeCouponModal() {
    this.showCouponModal = false;
    this.selectedDeal = null;
  }

  copyCouponCode() {
    if (this.selectedDeal) {
      navigator.clipboard.writeText(this.selectedDeal.couponCode);
      this.codeCopied = true;
      setTimeout(() => {
        this.codeCopied = false;
      }, 2000);
    }
  }
}
