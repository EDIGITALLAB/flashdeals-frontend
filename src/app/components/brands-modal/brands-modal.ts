import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-brands-modal',
  imports: [CommonModule],
  templateUrl: './brands-modal.html',
  styleUrl: './brands-modal.css',
})
export class BrandsModal implements OnDestroy {
  private _isOpen = false;

  @Input()
  set isOpen(value: boolean) {
    this._isOpen = value;
    if (typeof document !== 'undefined') {
      if (value) {
        document.documentElement.classList.add('modal-open');
        document.body.classList.add('modal-open');
      } else {
        document.documentElement.classList.remove('modal-open');
        document.body.classList.remove('modal-open');
      }
    }
  }

  get isOpen(): boolean {
    return this._isOpen;
  }

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

  viewAllBrands() {
    this.closeModal();
    this.router.navigate(['/explore']);
  }

  ngOnDestroy() {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove('modal-open');
      document.body.classList.remove('modal-open');
    }
  }
}
