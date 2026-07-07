import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upgrade-modal',
  imports: [CommonModule],
  templateUrl: './upgrade-modal.html',
  styleUrl: './upgrade-modal.css',
})
export class UpgradeModal {
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }
}
