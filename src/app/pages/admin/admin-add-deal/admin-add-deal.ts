import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-admin-add-deal',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admin-add-deal.html',
  styleUrl: './admin-add-deal.css'
})
export class AdminAddDeal implements OnInit {
  currentStep: number = 1;
  showSuccessModal: boolean = false;
  showAddBrandModal: boolean = false;
  showAddCategoryModal: boolean = false;
  newBrandName: string = '';
  newCategoryName: string = '';

  // Form Model
  dealTitle: string = 'Nike Revolution 6';
  brand: string = 'Nike';
  shortDescription: string = 'Get up to 50% off on selected running shoes from Nike.';
  category: string = 'Fashion';
  fullDescription: string = 'Experience superior comfort and performance with Nike Revolution 6. Lightweight, breathable and designed for your daily runs.';
  dealSource: string = 'Amazon';
  dealType: string = 'Flash Sale'; // Flash Sale, Coupon, Deal of the Day, Exclusive
  status: string = 'Draft';

  // Brands list & Categories list
  brands: string[] = ['Nike', 'Adidas', 'Puma', 'boAt', 'Apple', 'Samsung', 'Myntra', 'Puma', 'Skechers'];
  categories: string[] = ['Fashion', 'Electronics', 'Home & Kitchen', 'Beauty', 'Sports & Fitness', 'Food & Dining'];
  sources: string[] = ['Amazon', 'Flipkart', 'Myntra', 'Brand Website', 'Ajio', 'Tata CLiQ'];

  // Step 2: Images & Tags
  images: string[] = [
    'nike_shoes.png',
    'nike_shoe.png',
    'adidas_shoe.png',
    'puma_shoe.png'
  ];
  mainImageIndex: number = 0;

  tags: string[] = ['Nike', 'Running Shoes', 'Sports', 'Men', 'Fashion'];
  newTagInput: string = '';

  highlights: string[] = [
    'Premium quality',
    'Lightweight design',
    'Breathable material'
  ];
  newHighlightInput: string = '';

  // Step 3: Pricing & Schedule
  originalPrice: number = 7999;
  discountedPrice: number = 4999;
  couponCode: string = 'FLASH50';
  maxQuantity: number | string = 100;
  stockStatus: string = 'In Stock';
  startDate: string = '2025-04-25T10:00';
  endDate: string = '2025-04-30T23:59';
  visibility: string = 'Publish Immediately';

  // Navigation menu state
  activeNav: string = 'Add New Deal';

  ngOnInit(): void {}

  get discountPercentage(): number {
    if (!this.originalPrice || !this.discountedPrice || this.originalPrice <= 0) return 0;
    const diff = this.originalPrice - this.discountedPrice;
    if (diff <= 0) return 0;
    return parseFloat(((diff / this.originalPrice) * 100).toFixed(1));
  }

  get mainImage(): string {
    return this.images[this.mainImageIndex] || 'nike_shoes.png';
  }

  goToStep(step: number): void {
    if (step >= 1 && step <= 4) {
      this.currentStep = step;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  nextStep(): void {
    if (this.currentStep < 4) {
      this.currentStep++;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // Tags Management
  addTag(): void {
    const val = this.newTagInput.trim();
    if (val && !this.tags.includes(val)) {
      this.tags.push(val);
      this.newTagInput = '';
    }
  }

  removeTag(index: number): void {
    this.tags.splice(index, 1);
  }

  // Highlights Management
  addHighlight(): void {
    const val = this.newHighlightInput.trim();
    if (val) {
      this.highlights.push(val);
      this.newHighlightInput = '';
    }
  }

  removeHighlight(index: number): void {
    this.highlights.splice(index, 1);
  }

  // Image Management
  setMainImage(index: number): void {
    this.mainImageIndex = index;
  }

  removeImage(index: number): void {
    if (this.images.length > 1) {
      this.images.splice(index, 1);
      if (this.mainImageIndex >= this.images.length) {
        this.mainImageIndex = 0;
      }
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.images.push(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  // Quick Brand / Category Add
  openAddBrand(): void {
    this.showAddBrandModal = true;
  }

  closeAddBrand(): void {
    this.showAddBrandModal = false;
    this.newBrandName = '';
  }

  saveBrand(): void {
    if (this.newBrandName.trim()) {
      const name = this.newBrandName.trim();
      if (!this.brands.includes(name)) {
        this.brands.push(name);
      }
      this.brand = name;
      this.closeAddBrand();
    }
  }

  openAddCategory(): void {
    this.showAddCategoryModal = true;
  }

  closeAddCategory(): void {
    this.showAddCategoryModal = false;
    this.newCategoryName = '';
  }

  saveCategory(): void {
    if (this.newCategoryName.trim()) {
      const name = this.newCategoryName.trim();
      if (!this.categories.includes(name)) {
        this.categories.push(name);
      }
      this.category = name;
      this.closeAddCategory();
    }
  }

  // Final Action
  publishDeal(): void {
    this.showSuccessModal = true;
  }

  closeSuccessModal(): void {
    this.showSuccessModal = false;
  }

  resetForm(): void {
    this.currentStep = 1;
    this.showSuccessModal = false;
  }
}
