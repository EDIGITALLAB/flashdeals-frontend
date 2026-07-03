import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-toolbar',
  imports: [CommonModule],
  templateUrl: './product-toolbar.html',
  styleUrl: './product-toolbar.css',
})
export class ProductToolbar {
  @Input() view: 'pills' | 'header' = 'pills';

  @HostBinding('class') get hostClass() {
    return this.view === 'pills' ? 'toolbar-pills' : 'toolbar-header';
  }
}
