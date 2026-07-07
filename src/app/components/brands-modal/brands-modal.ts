import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-brands-modal',
  imports: [CommonModule],
  templateUrl: './brands-modal.html',
  styleUrl: './brands-modal.css',
})
export class BrandsModal {
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();

  brands = [
    { name: 'Nike', logoType: 'nike' },
    { name: 'Adidas', logoType: 'adidas' },
    { name: 'Puma', logoType: 'puma' },
    { name: 'boAt', logoType: 'boat' },
    { name: 'Myntra', logoType: 'myntra' },
    { name: 'Swiggy', logoType: 'swiggy' },
    { name: 'Samsung', logoType: 'samsung' },
    { name: 'KFC', logoType: 'kfc' }
  ];

  constructor(private router: Router) {}

  selectBrand(brandName: string) {
    this.closeModal();
    this.router.navigate(['/explore'], { queryParams: { brand: brandName } });
  }

  closeModal() {
    this.close.emit();
  }
}
