import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-seller-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './seller-register.html',
  styleUrl: './seller-register.css'
})
export class SellerRegister implements OnInit {
  currentStep: number = 1;

  // Step 1: Owner & Account Info
  ownerName: string = '';
  storeName: string = '';
  email: string = '';
  phone: string = '';
  whatsappNumber: string = '';
  password: string = '';
  confirmPassword: string = '';

  // Step 2: Physical Store Location & Timing
  storeCategory: string = 'Fashion & Apparel';
  storeAddress: string = '';
  areaLocality: string = '';
  city: string = '';
  pincode: string = '';
  googleMapsUrl: string = '';

  // Timing Dropdown selections
  selectedOpenTime: string = '10:00 AM';
  selectedCloseTime: string = '09:30 PM';
  selectedWorkingDays: string = 'Mon - Sun (All Days)';

  openingTimes: string[] = [
    '08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM',
    '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM'
  ];

  closingTimes: string[] = [
    '07:00 PM', '07:30 PM', '08:00 PM', '08:30 PM',
    '09:00 PM', '09:30 PM', '10:00 PM', '10:30 PM',
    '11:00 PM', '11:30 PM', '12:00 AM'
  ];

  workingDaysOptions: string[] = [
    'Mon - Sun (All Days)',
    'Mon - Sat',
    'Mon - Fri',
    'Everyday (Except Tuesday)',
    'Everyday (Except Monday)'
  ];

  // Map & GPS Geolocation State
  lat: number = 21.5013;
  lng: number = 86.9239;
  mapEmbedUrl: SafeResourceUrl | null = null;
  isDetectingLocation: boolean = false;
  locationDetected: boolean = false;
  detectedCoords: string = '';

  // Step 3: Deals & Discount Setup + Verification
  primaryOfferType: string = 'Percentage Discount';
  gstinOrTradeLicense: string = '';
  storeContactForCustomers: string = '';
  agreePartnerTerms: boolean = false;
  showPassword: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  // Legal Document Upload State
  gstDocFileName: string = '';
  panDocFileName: string = '';
  storePhotoFileName: string = '';

  categories: string[] = [
    'Fashion & Apparel',
    'Electronics & Mobiles',
    'Restaurants & Cafes',
    'Salon, Spa & Beauty',
    'Groceries & Supermarket',
    'Footwear & Accessories',
    'Fitness & Gym',
    'Jewellery & Watches',
    'Home Decor & Furniture',
    'General Retail Store'
  ];

  offerTypes: string[] = [
    'Percentage Discount (e.g. Flat 30% OFF)',
    'Flat Amount Discount (e.g. ₹500 OFF on ₹2000)',
    'Buy 1 Get 1 Free (BOGO)',
    'Exclusive In-Store Coupon Code',
    'Seasonal / Flash Clearance Sale'
  ];

  constructor(
    private router: Router,
    private authService: AuthService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.updateMapUrl();
  }

  get formattedTimings(): string {
    return `${this.selectedOpenTime} - ${this.selectedCloseTime} (${this.selectedWorkingDays})`;
  }

  updateMapUrl() {
    let urlString = `https://maps.google.com/maps?q=${this.lat},${this.lng}&z=15&output=embed`;
    if (this.areaLocality || this.city) {
      const locationText = encodeURIComponent(`${this.storeAddress ? this.storeAddress + ', ' : ''}${this.areaLocality ? this.areaLocality + ', ' : ''}${this.city}`);
      urlString = `https://maps.google.com/maps?q=${locationText}&z=15&output=embed`;
    }
    this.mapEmbedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(urlString);
  }

  onAddressChange() {
    this.updateMapUrl();
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onGstDocSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.gstDocFileName = file.name;
    }
  }

  onPanDocSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.panDocFileName = file.name;
    }
  }

  onStorePhotoSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.storePhotoFileName = file.name;
    }
  }

  detectLocation() {
    this.isDetectingLocation = true;
    this.errorMessage = '';

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.isDetectingLocation = false;
          this.locationDetected = true;
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          this.detectedCoords = `${this.lat.toFixed(4)}° N, ${this.lng.toFixed(4)}° E`;
          const embedUrl = `https://maps.google.com/maps?q=${this.lat},${this.lng}&z=16&output=embed`;
          this.mapEmbedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
          if (!this.areaLocality) this.areaLocality = 'Bandra West';
          if (!this.city) this.city = 'Mumbai';
          if (!this.pincode) this.pincode = '400050';
          this.googleMapsUrl = `https://maps.google.com/?q=${this.lat.toFixed(4)},${this.lng.toFixed(4)}`;
        },
        (error) => {
          this.isDetectingLocation = false;
          this.locationDetected = true;
          this.lat = 21.5013;
          this.lng = 86.9239;
          this.detectedCoords = '21.5013° N, 86.9239° E';
          const embedUrl = `https://maps.google.com/maps?q=${this.lat},${this.lng}&z=15&output=embed`;
          this.mapEmbedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
          if (!this.areaLocality) this.areaLocality = 'Bandra West';
          if (!this.city) this.city = 'Mumbai';
          if (!this.pincode) this.pincode = '400050';
          this.googleMapsUrl = `https://maps.google.com/?q=${this.lat},${this.lng}`;
        }
      );
    } else {
      this.isDetectingLocation = false;
      this.locationDetected = true;
      this.lat = 21.5013;
      this.lng = 86.9239;
      this.detectedCoords = '21.5013° N, 86.9239° E';
      this.updateMapUrl();
    }
  }

  goToStep(step: number) {
    if (step > this.currentStep) {
      if (!this.validateStep(this.currentStep)) {
        return;
      }
    }
    this.errorMessage = '';
    this.currentStep = step;
  }

  validateStep(step: number): boolean {
    if (step === 1) {
      if (!this.ownerName || !this.storeName || !this.email || !this.phone || !this.password || !this.confirmPassword) {
        this.errorMessage = 'Please fill in all owner and account details in Step 1.';
        return false;
      }
      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'Passwords do not match.';
        return false;
      }
      if (this.password.length < 6) {
        this.errorMessage = 'Password must be at least 6 characters long.';
        return false;
      }
    } else if (step === 2) {
      if (!this.storeAddress || !this.areaLocality || !this.city || !this.pincode) {
        this.errorMessage = 'Please provide your physical store address, locality, city, and pincode.';
        return false;
      }
    }
    this.errorMessage = '';
    return true;
  }

  onSubmit() {
    if (!this.validateStep(1) || !this.validateStep(2)) {
      return;
    }

    if (!this.agreePartnerTerms) {
      this.errorMessage = 'Please agree to the Store Partner Agreement to continue.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    setTimeout(() => {
      this.isLoading = false;
      this.authService.login('admin');
      this.successMessage = `🎉 Success! Store "${this.storeName}" registered with Legal Documents verified! Redirecting to Partner Portal to post your first deal...`;

      setTimeout(() => {
        this.router.navigate(['/admin/dashboard']);
      }, 1500);
    }, 1200);
  }
}
