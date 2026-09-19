import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Breadcrumb } from '../../components/breadcrumb/breadcrumb';
import { Navbar } from '../../components/navbar/navbar';

@Component({
  selector: 'app-deal-details',
  imports: [CommonModule, RouterLink, FormsModule, Breadcrumb, Navbar],
  templateUrl: './deal-details.html',
  styleUrl: './deal-details.css',
})
export class DealDetails implements OnInit, OnDestroy {
  images = [
    '/nike_shoe.png',
    '/nike_shoes.png',
    '/adidas_shoe.png',
    '/puma_shoe.png',
    '/skechers_shoe.png'
  ];
  currentImgIndex = 0;

  get selectedImage(): string {
    return this.images[this.currentImgIndex];
  }

  secondsLeft = 8076; // 2 hours, 14 mins, 36 secs
  timerInterval: any;

  selectedSize = '8';
  availableSizes = ['6', '7', '8', '9', '10', '11'];

  selectedColor = 'Black/White';
  colorOptions = [
    { name: 'Black/White', class: 'color-black' },
    { name: 'Light Grey', class: 'color-grey' },
    { name: 'Royal Blue', class: 'color-blue' },
    { name: 'Pure White', class: 'color-white' },
    { name: 'Olive Green', class: 'color-green' }
  ];

  pincode = '560001';
  pincodeChecked = true;
  deliveryDate = 'Delivered in 3-5 days to Bengaluru 560001';

  isWishlisted = false;
  addedToCart = false;

  activeTab = 'overview'; // 'overview' | 'specifications' | 'reviews' | 'questions' | 'similar'

  // Frequently Bought Together Items
  includeSocks = true;
  includeBag = true;

  ngOnInit() {
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

  prevImg() {
    if (this.currentImgIndex > 0) {
      this.currentImgIndex--;
    } else {
      this.currentImgIndex = this.images.length - 1;
    }
  }

  nextImg() {
    if (this.currentImgIndex < this.images.length - 1) {
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

  addToCart() {
    this.addedToCart = true;
    setTimeout(() => {
      this.addedToCart = false;
    }, 3000);
  }

  checkPincode() {
    if (this.pincode.length === 6) {
      this.pincodeChecked = true;
      this.deliveryDate = 'Delivered in 3-5 days to Bengaluru ' + this.pincode;
    }
  }

  getBoughtTogetherTotal(): number {
    let total = 2099;
    if (this.includeSocks) total += 499;
    if (this.includeBag) total += 799;
    return total;
  }

  getBoughtTogetherOriginalTotal(): number {
    let total = 4695;
    if (this.includeSocks) total += 999;
    if (this.includeBag) total += 1499;
    return total;
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
