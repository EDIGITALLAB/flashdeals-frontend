import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MainSidebar } from '../../components/main-sidebar/main-sidebar';
import { Navbar } from '../../components/navbar/navbar';

interface Deal {
  id: number;
  brand: string;
  discount: string;
  title: string;
  price: string;
  originalPrice: string;
  image: string;
  rating?: number;
  ratingCount?: string;
  isPrime?: boolean;
  category?: string;
  rank?: string;
}

export interface QuadFeaturedItem {
  id: number;
  label: string;
  prefix?: string;
  suffix?: string;
  image: string;
  badge?: string;
  isGoldBadge?: boolean;
  price?: string;
  originalPrice?: string;
  discount?: string;
}

export interface QuadFeaturedCard {
  id: string;
  title: string;
  footerLinkText: string;
  items: QuadFeaturedItem[];
}

export interface HeroSlide {
  tag: string;
  tagIcon: string;
  title: string;
  highlightText: string;
  subtitle: string;
  btnText: string;
  gradientClass: string;
  icon: string;
  badgePrefix: string;
  badgePercent: string;
  badgeSuffix: string;
  coupon: string;
  perks: string[];
  productImage: string;
  productName: string;
  productCategory: string;
  dealPrice: string;
  origPrice: string;
  floatingTag: string;
  rating?: string;
  reviews?: string;
  urgencyText?: string;
  quickTags?: string[];
}

export interface PopularStore {
  id: number;
  name: string;
  category: string;
  rating: number;
  reviewsCount: number;
  distance: string;
  locality: string;
  activeDealsCount: number;
  featuredOffer: string;
  image: string;
  verified: boolean;
}

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink, MainSidebar, Navbar],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, OnDestroy {
  constructor(private cdr: ChangeDetectorRef) {}

  @ViewChild('quadGrid') quadGrid!: ElementRef<HTMLDivElement>;

  scrollQuadLeft() {
    this.quadGrid.nativeElement.scrollBy({ left: -320, behavior: 'smooth' });
  }

  scrollQuadRight() {
    this.quadGrid.nativeElement.scrollBy({ left: 320, behavior: 'smooth' });
  }

  headerSecondsLeft = 2 * 3600 + 14 * 60 + 22;
  headerTimerString = '02 : 14 : 22';


  // Amazon-Style Signature Quad Cards (4 Categories / 2x2 Grid)
  quadCards = [
    {
      title: 'Up to 70% off | Styles for Men & Women',
      subtitle: 'Top brands in clothing, footwear & lifestyle',
      linkText: 'See all styles',
      link: '/explore',
      items: [
        { label: 'Clothing & Denim', image: '/cat_fashion.jpg', link: '/explore' },
        { label: 'Footwear & Kicks', image: '/adidas_shoes.png', link: '/explore' },
        { label: 'Backpacks & Bags', image: '/fitness_gear.png', link: '/explore' },
        { label: 'Watches & Perfumes', image: '/myntra_fashion.jpg', link: '/explore' }
      ]
    },
    {
      title: 'Electronics & Audio | Starting ₹499',
      subtitle: 'Bestselling audio, wearables & tech gadgets',
      linkText: 'Explore electronics',
      link: '/explore',
      items: [
        { label: 'Wireless Audio', image: '/boat_headphones.png', link: '/explore' },
        { label: 'Smart Watches', image: '/smartwatch_deal.jpg', link: '/explore' },
        { label: 'Gaming Setup', image: '/gaming_setup.png', link: '/explore' },
        { label: 'Smart Home Devices', image: '/smart_home.png', link: '/explore' }
      ]
    },
    {
      title: 'Revamp Your Home & Daily Living',
      subtitle: 'Appliances, decor & personal essentials',
      linkText: 'Shop home & living',
      link: '/explore',
      items: [
        { label: 'Kitchen Appliances', image: '/cat_appliances.jpg', link: '/explore' },
        { label: 'Home & Decor', image: '/cat_home.jpg', link: '/explore' },
        { label: 'Beauty & Skincare', image: '/cat_beauty.jpg', link: '/explore' },
        { label: 'Health & Wellness', image: '/cat_health.jpg', link: '/explore' }
      ]
    },
    {
      title: 'Sports, Fitness & Outdoors',
      subtitle: 'Top gear for an active lifestyle',
      linkText: 'Explore fitness deals',
      link: '/explore',
      items: [
        { label: 'Yoga & Fitness', image: '/fitness_gear.png', link: '/explore' },
        { label: 'Racquets & Sports', image: '/smartwatch_deal.jpg', link: '/explore' },
        { label: 'Cycles & Scooters', image: '/cat_appliances.jpg', link: '/explore' },
        { label: 'Smart Fitness', image: '/smartwatch_deal.jpg', link: '/explore' }
      ]
    },
    {
      title: 'Books, Toys & Kids Zone',
      subtitle: 'Fun learning & play for every age',
      linkText: 'Explore kids & toys',
      link: '/explore',
      items: [
        { label: 'Story Books', image: '/cat_beauty.jpg', link: '/explore' },
        { label: 'Building Blocks', image: '/cat_home.jpg', link: '/explore' },
        { label: 'Board Games', image: '/gaming_setup.png', link: '/explore' },
        { label: 'Soft Toys', image: '/cat_fashion.jpg', link: '/explore' }
      ]
    }
  ];

  // Amazon Spotlight "Deal of the Day" Box (Card 4)
  spotlightDeal = {
    badge: 'Deal of the Day',
    discount: '60% OFF',
    brand: 'Nike',
    title: "Nike Revolution 7 Running Shoes",
    price: '₹2,399',
    originalPrice: '₹5,999',
    image: '/nike_shoes.png',
    rating: 4.8,
    reviews: '2,450',
    delivery: 'FREE Delivery by Tomorrow, 11 AM',
    linkText: 'See all lightning deals',
    link: '/explore',
    btnText: 'Go to Store'
  };

  // Deal category filter
  selectedDealFilter = 'all';

  dealFilters = [
    { id: 'all', label: 'All Deals' },
    { id: 'electronics', label: 'Electronics' },
    { id: 'fashion', label: 'Fashion & Shoes' },
    { id: 'food', label: 'Dining & Foods' }
  ];

  deals: Deal[] = [
    { id: 1, brand: 'Nike', discount: '60% OFF', title: "Nike Revolution 7 Men's Running Shoes", price: '₹2,399', originalPrice: '₹5,999', image: '/nike_shoes.png', rating: 4.6, ratingCount: '2,410', isPrime: true, category: 'fashion' },
    { id: 2, brand: 'boAt', discount: '70% OFF', title: 'boAt Airdopes 141 ANC Wireless Earbuds', price: '₹1,499', originalPrice: '₹4,999', image: '/boat_headphones.png', rating: 4.4, ratingCount: '15,820', isPrime: true, category: 'electronics' },
    { id: 3, brand: 'Myntra', discount: '40% OFF', title: "Roadster Women's Denim Trucker Jacket", price: '₹1,799', originalPrice: '₹2,999', image: '/myntra_denim.jpg', rating: 4.5, ratingCount: '890', isPrime: true, category: 'fashion' },
    { id: 4, brand: 'Swiggy', discount: '50% OFF', title: 'Swiggy Gourmet Dining & Family Combos', price: '₹250', originalPrice: '₹500', image: '/swiggy_meal.jpg', rating: 4.7, ratingCount: '5,300', isPrime: false, category: 'food' }
  ];

  get filteredDeals() {
    if (this.selectedDealFilter === 'all') {
      return this.deals;
    }
    return this.deals.filter(d => d.category === this.selectedDealFilter);
  }

  setDealFilter(categoryId: string) {
    this.selectedDealFilter = categoryId;
    this.cdr.detectChanges();
  }

  trendingDeals: Deal[] = [
    { id: 101, rank: '#1 Best Seller', brand: 'Nike', discount: '58% off', title: "Nike Revolution 7 Men's Running Shoes", price: '₹2,499', originalPrice: '₹5,999', image: '/nike_shoes.png', rating: 4.7, ratingCount: '2,890', isPrime: true },
    { id: 102, rank: '#2 Best Seller', brand: 'boAt', discount: '67% off', title: 'boAt Rockerz 550 Wireless Bluetooth Headphones', price: '₹1,299', originalPrice: '₹3,999', image: '/boat_headphones.png', rating: 4.5, ratingCount: '14,350', isPrime: true },
    { id: 103, rank: '#3 Best Seller', brand: 'Fire-Boltt', discount: '44% off', title: 'Fire-Boltt Phoenix 1.43" AMOLED Smartwatch', price: '₹1,999', originalPrice: '₹3,999', image: '/smartwatch_deal.jpg', rating: 4.4, ratingCount: '1,890', isPrime: true },
    { id: 104, rank: '#4 Best Seller', brand: 'Adidas', discount: '55% off', title: 'Adidas Originals Superstar Casual Sneakers', price: '₹2,199', originalPrice: '₹4,999', image: '/adidas_shoes.png', rating: 4.8, ratingCount: '3,210', isPrime: true },
    { id: 105, rank: '#5 Best Seller', brand: 'Puma', discount: '50% off', title: 'Puma Smashic Retro Unisex Sneakers', price: '₹1,799', originalPrice: '₹3,599', image: '/puma_shoes.png', rating: 4.6, ratingCount: '2,670', isPrime: true }
  ];

  // Amazon 4-Quadrant Multi-Category Deals Shelf (FlashDeals Theme Look - 6 items per card)
  quadFeaturedDeals: QuadFeaturedCard[] = [
    {
      id: 'sports-fitness',
      title: 'Budget friendly sports & fitness finds',
      footerLinkText: 'See all sports & fitness offers',
      items: [
        {
          id: 1,
          label: 'Under ₹499 | Fitness accessories',
          prefix: 'Under ₹499',
          suffix: 'Fitness accessories',
          image: '/fitness_gear.png',
          badge: 'Bestseller',
          isGoldBadge: true
        },
        {
          id: 2,
          label: 'Under ₹499 | Racquets & gear',
          prefix: 'Under ₹499',
          suffix: 'Racquets & gear',
          image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400&q=80',
          badge: 'Top Rated',
          isGoldBadge: true
        },
        {
          id: 3,
          label: 'Under ₹999 | Scooters & ride-ons',
          prefix: 'Under ₹999',
          suffix: 'Scooters & ride-ons',
          image: 'https://images.unsplash.com/photo-1595760780346-f972eb49709f?w=400&q=80',
          badge: 'Bestseller',
          isGoldBadge: true
        },
        {
          id: 4,
          label: 'Under ₹699 | Dumbbells & weights',
          prefix: 'Under ₹699',
          suffix: 'Dumbbells & weights',
          image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=400&q=80',
          badge: 'Top Brands',
          isGoldBadge: true
        },
        {
          id: 5,
          label: 'Under ₹799 | Yoga & fitness mats',
          prefix: 'Under ₹799',
          suffix: 'Yoga & fitness mats',
          image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&q=80',
          badge: 'Popular',
          isGoldBadge: true
        },
        {
          id: 6,
          label: 'Under ₹1,299 | Smart fitness bands',
          prefix: 'Under ₹1,299',
          suffix: 'Smart fitness bands',
          image: '/smartwatch_deal.jpg',
          badge: 'Min 50% Off',
          isGoldBadge: true
        }
      ]
    },
    {
      id: 'home-kitchen',
      title: 'Top deals on home, kitchen & outdoors',
      footerLinkText: 'See all deals on home & kitchen',
      items: [
        {
          id: 7,
          label: 'Nilkamal SLEEP Lite Dual',
          price: '₹4,690',
          originalPrice: '₹7,249',
          discount: '35% off',
          badge: 'Festival Deal',
          isGoldBadge: false,
          image: '/cat_home.jpg'
        },
        {
          id: 8,
          label: 'Sujata MG01 Mixer Grinder',
          price: '₹6,540',
          originalPrice: '₹10,290',
          discount: '36% off',
          badge: 'Limited Deal',
          isGoldBadge: false,
          image: '/cat_appliances.jpg'
        },
        {
          id: 9,
          label: 'SEZNIK Smart Wireless Automation',
          price: '₹2,499',
          originalPrice: '₹4,999',
          discount: '50% off',
          badge: 'Mega Deal',
          isGoldBadge: false,
          image: '/smart_home.png'
        },
        {
          id: 10,
          label: 'Digital Multi-Air Fryer 4.2L',
          price: '₹5,999',
          originalPrice: '₹10,999',
          discount: '45% off',
          badge: 'Top Rated',
          isGoldBadge: false,
          image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&q=80'
        }
      ]
    },
    {
      id: 'kids-favourites',
      title: "Starting ₹65 | Top deals on kids' favourites",
      footerLinkText: 'Explore kids & toys store',
      items: [
        {
          id: 13,
          label: 'Starting ₹65 | Interactive books',
          prefix: 'Starting ₹65',
          suffix: 'Interactive books',
          badge: '',
          isGoldBadge: false,
          image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&q=80'
        },
        {
          id: 14,
          label: 'Under ₹195 | Early learning toys',
          prefix: 'Under ₹195',
          suffix: 'Early learning toys',
          badge: '',
          isGoldBadge: false,
          image: '/cat_toys.jpg'
        },
        {
          id: 15,
          label: 'Starting ₹129 | Fun story books',
          prefix: 'Starting ₹129',
          suffix: 'Story books',
          badge: '',
          isGoldBadge: false,
          image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80'
        },
        {
          id: 16,
          label: 'Starting ₹99 | DIY toys & crafts',
          prefix: 'Starting ₹99',
          suffix: 'DIY toys & crafts',
          badge: '',
          isGoldBadge: false,
          image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400&q=80'
        },
        {
          id: 17,
          label: 'Under ₹249 | Building blocks sets',
          prefix: 'Under ₹249',
          suffix: 'Building blocks sets',
          badge: '',
          isGoldBadge: false,
          image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&q=80'
        },
        {
          id: 18,
          label: 'Starting ₹149 | Soft plush toys',
          prefix: 'Starting ₹149',
          suffix: 'Soft plush toys',
          badge: '',
          isGoldBadge: false,
          image: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?w=400&q=80'
        }
      ]
    },
    {
      id: 'footwear-audio',
      title: 'Best Sellers in Electronics & Footwear',
      footerLinkText: 'See all best sellers',
      items: [
        {
          id: 19,
          label: 'boAt Rockerz 550 Wireless',
          price: '₹1,299',
          originalPrice: '₹3,999',
          discount: '67% off',
          badge: '#1 Seller',
          isGoldBadge: true,
          image: '/boat_headphones.png'
        },
        {
          id: 20,
          label: 'Nike Revolution 7 Running Shoes',
          price: '₹2,499',
          originalPrice: '₹5,999',
          discount: '58% off',
          badge: '#2 Seller',
          isGoldBadge: true,
          image: '/nike_shoes.png'
        },
        {
          id: 21,
          label: 'Fire-Boltt 1.43" AMOLED Smartwatch',
          price: '₹1,999',
          originalPrice: '₹3,999',
          discount: '44% off',
          badge: '#3 Trending',
          isGoldBadge: false,
          image: '/smartwatch_deal.jpg'
        },
        {
          id: 22,
          label: 'Adidas Superstar Casual Sneakers',
          price: '₹2,199',
          originalPrice: '₹4,999',
          discount: '55% off',
          badge: '#4 Popular',
          isGoldBadge: false,
          image: '/adidas_shoes.png'
        }
      ]
    }
  ];

  recentlyViewedDeals = [
    { id: 201, title: 'boAt Rockerz 550 Wireless', price: '₹1,499', originalPrice: '₹3,499', image: '/boat_headphones.png', viewedTime: 'Viewed 2 hours ago', rating: 4.4, reviews: '1.2k', isPrime: true },
    { id: 202, title: 'Nike Air Max 270 Sneakers', price: '₹4,999', originalPrice: '₹8,999', image: '/nike_shoes.png', viewedTime: 'Viewed 5 hours ago', rating: 4.8, reviews: '940', isPrime: true },
    { id: 203, title: 'Fire-Boltt Ninja AMOLED', price: '₹1,999', originalPrice: '₹3,999', image: '/smartwatch_deal.jpg', viewedTime: 'Viewed 1 day ago', rating: 4.3, reviews: '620', isPrime: true }
  ];

  recommendedDeals = [
    { id: 301, title: 'HRX Urban Graphic Hoodie', price: '₹1,299', originalPrice: '₹2,499', image: '/cat_fashion.jpg', rating: 4.6, reviews: '820', isPrime: true },
    { id: 302, title: 'Lenskart Polarized Sunglasses', price: '₹1,799', originalPrice: '₹3,499', image: '/cat_beauty.jpg', rating: 4.5, reviews: '1.5k', isPrime: true },
    { id: 303, title: 'Minimalist 10% Vitamin C Serum', price: '₹599', originalPrice: '₹899', image: '/cat_health.jpg', rating: 4.7, reviews: '3.1k', isPrime: true }
  ];

  wishlistMap: { [key: number]: boolean } = {};
  addedToCartToast: string | null = null;
  private cartToastTimeout: any;

  toggleWishlist(id: number, event: Event) {
    event.stopPropagation();
    this.wishlistMap[id] = !this.wishlistMap[id];
    this.cdr.detectChanges();
  }

  addToCart(itemTitle: string, event: Event) {
    event.stopPropagation();
    this.addedToCartToast = `Added "${itemTitle}" to cart!`;
    this.cdr.detectChanges();
    if (this.cartToastTimeout) clearTimeout(this.cartToastTimeout);
    this.cartToastTimeout = setTimeout(() => {
      this.addedToCartToast = null;
      this.cdr.detectChanges();
    }, 2800);
  }

  currentDealsPage = 0;
  showExpandedCategories = false;

  categoriesList = [
    { title: 'Electronics', image: '/boat_headphones.png', isContain: true, offer: 'Min. 40% OFF', bgClass: 'bg-tech' },
    { title: 'Home & Living', image: '/cat_home.jpg', isContain: false, offer: 'Up to 60% OFF', bgClass: 'bg-home' },
    { title: 'Beauty', image: '/cat_beauty.jpg', isContain: false, offer: 'From ₹199', bgClass: 'bg-beauty' },
    { title: 'Food & Dining', image: '/cat_food.jpg', isContain: false, offer: 'Flat 50% OFF', bgClass: 'bg-food' },
    { title: 'Travel', image: '/cat_travel.jpg', isContain: false, offer: 'Up to ₹2,500 OFF', bgClass: 'bg-travel' },
    { title: 'Toys & Games', image: '/cat_toys.jpg', isContain: false, offer: 'Min. 30% OFF', bgClass: 'bg-toys' }
  ];

  expandedCategoriesList = [
    { title: 'Sports & Gym', image: '/fitness_gear.png', isContain: true, offer: 'Up to 55% OFF', bgClass: 'bg-sports' },
    { title: 'Appliances', image: '/cat_appliances.jpg', isContain: false, offer: 'From ₹1,499', bgClass: 'bg-appliances' },
    { title: 'Health', image: '/cat_health.jpg', isContain: false, offer: 'Min. 40% OFF', bgClass: 'bg-health' },
    { title: 'Gaming Gear', image: '/gaming_setup.png', isContain: true, offer: 'Up to 50% OFF', bgClass: 'bg-gaming' },
    { title: 'Luxury Styles', image: '/myntra_fashion.jpg', isContain: false, offer: 'Flat 45% OFF', bgClass: 'bg-luxury' },
    { title: 'Denim & More', image: '/myntra_denim.jpg', isContain: false, offer: 'Min. 50% OFF', bgClass: 'bg-denim' },
    { title: 'Smartwatches', image: '/smartwatch_deal.jpg', isContain: false, offer: 'Up to 65% OFF', bgClass: 'bg-wearable' }
  ];

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
  private copyTimeout: any;
  currentSlide = 0;
  copiedCoupon: string | null = null;

  slides: HeroSlide[] = [
    {
      tag: 'MEGA CLEARANCE SALE',
      tagIcon: 'bolt',
      title: 'Big Brands.',
      highlightText: 'Bigger Savings.',
      subtitle: 'Up to 80% OFF on 5,000+ top brands in electronics, fashion & daily essentials',
      btnText: 'Explore Deals',
      gradientClass: 'purple-gradient',
      icon: 'bolt',
      badgePrefix: 'UP TO',
      badgePercent: '80%',
      badgeSuffix: 'OFF',
      coupon: 'BIGSAVE80',
      perks: ['Free Fast Delivery', 'Verified Genuine', 'Extra 10% on UPI'],
      productImage: '/nike_shoes.png',
      productName: 'Nike Air Max 270',
      productCategory: 'Premium Footwear',
      dealPrice: '₹2,399',
      origPrice: '₹7,999',
      floatingTag: '🔥 2.4k Sold Today',
      rating: '4.8',
      reviews: '2,890',
      urgencyText: '⚡ Limited Time Deal • Ends Today',
      quickTags: ['👟 Sneakers', '🎧 Audio Tech', '⌚ Wearables', '🔥 Top Deals']
    },
    {
      tag: 'AUDIO & TECH FEST',
      tagIcon: 'headphones',
      title: 'Electronics',
      highlightText: 'Mega Sale',
      subtitle: 'Flat 40% OFF on wireless headphones, smartwatches & trending accessories',
      btnText: 'Shop Gadgets',
      gradientClass: 'blue-gradient',
      icon: 'phone_iphone',
      badgePrefix: 'FLAT',
      badgePercent: '40%',
      badgeSuffix: 'OFF',
      coupon: 'TECH40',
      perks: ['1 Year Warranty', 'No Cost EMI', 'Same Day Dispatch'],
      productImage: '/boat_headphones.png',
      productName: 'boAt Rockerz 550',
      productCategory: 'Wireless Audio',
      dealPrice: '₹1,499',
      origPrice: '₹4,999',
      floatingTag: '⭐ 4.8 Top Rated',
      rating: '4.9',
      reviews: '14,350',
      urgencyText: '⚡ Flash Deal • 18 Left in Stock',
      quickTags: ['🎧 Over-Ear ANC', '⌚ Smartwatches', '🔊 Bluetooth Speakers', '⚡ Gaming']
    },
    {
      tag: 'WEEKEND EXCLUSIVE',
      tagIcon: 'shopping_bag',
      title: 'Fashion',
      highlightText: 'Weekend Bash',
      subtitle: 'Minimum 60% OFF on trending sneakers, casual clothing & accessories',
      btnText: 'View Styles',
      gradientClass: 'fashion-gradient',
      icon: 'shopping_bag',
      badgePrefix: 'MIN',
      badgePercent: '60%',
      badgeSuffix: 'OFF',
      coupon: 'WEEKEND60',
      perks: ['Top Brands: Nike & Adidas', '30-Day Easy Returns', '100% Original'],
      productImage: '/adidas_shoes.png',
      productName: 'Adidas Retropy E5',
      productCategory: 'Streetwear & Kicks',
      dealPrice: '₹1,999',
      origPrice: '₹5,499',
      floatingTag: '✨ New Season Drop',
      rating: '4.7',
      reviews: '3,210',
      urgencyText: '⚡ Weekend Exclusive • Extra 10% on UPI',
      quickTags: ['👟 Retro Kicks', '👕 Streetwear', '🎒 Bags & Packs', '✨ Fresh Arrivals']
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

    this.startCarouselAutoplay();
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    if (this.carouselIntervalId) {
      clearInterval(this.carouselIntervalId);
    }
    if (this.copyTimeout) {
      clearTimeout(this.copyTimeout);
    }
  }

  startCarouselAutoplay() {
    this.stopCarouselAutoplay();
    this.carouselIntervalId = setInterval(() => {
      this.nextSlide();
    }, 4500);
  }

  stopCarouselAutoplay() {
    if (this.carouselIntervalId) {
      clearInterval(this.carouselIntervalId);
      this.carouselIntervalId = null;
    }
  }

  pauseCarousel() {
    this.stopCarouselAutoplay();
  }

  resumeCarousel() {
    this.startCarouselAutoplay();
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    this.cdr.detectChanges();
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.cdr.detectChanges();
    this.startCarouselAutoplay();
  }

  setSlide(index: number) {
    this.currentSlide = index;
    this.cdr.detectChanges();
    this.startCarouselAutoplay();
  }

  copyCoupon(code: string, event: Event) {
    event.stopPropagation();
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(code).then(() => {
        this.triggerCopied(code);
      }).catch(() => {
        this.triggerCopied(code);
      });
    } else {
      this.triggerCopied(code);
    }
  }

  private triggerCopied(code: string) {
    this.copiedCoupon = code;
    this.cdr.detectChanges();
    if (this.copyTimeout) {
      clearTimeout(this.copyTimeout);
    }
    this.copyTimeout = setTimeout(() => {
      this.copiedCoupon = null;
      this.cdr.detectChanges();
    }, 2000);
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

