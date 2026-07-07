import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface EarlyAccessSale {
  id: number;
  name: string;
  brandKey: string;
  dateString: string;
  secondsLeft: number;
  timerString?: string;
}

@Component({
  selector: 'app-early-access',
  imports: [CommonModule, RouterLink],
  templateUrl: './early-access.html',
  styleUrl: './early-access.css',
})
export class EarlyAccess implements OnInit, OnDestroy {
  sales: EarlyAccessSale[] = [
    {
      id: 1,
      name: 'Myntra End of Reason Sale',
      brandKey: 'myntra',
      dateString: '10 May, 10:00 AM',
      secondsLeft: 2 * 3600 + 45 * 60 + 30
    },
    {
      id: 2,
      name: 'Flipkart Big Saving Days',
      brandKey: 'flipkart',
      dateString: '12 May, 12:00 PM',
      secondsLeft: 5 * 3600 + 15 * 60 + 40
    },
    {
      id: 3,
      name: 'AJIO Luxe Collection',
      brandKey: 'ajio',
      dateString: '13 May, 09:00 AM',
      secondsLeft: 1 * 3600 + 10 * 60 + 25
    }
  ];

  notifiedSales: { [key: number]: boolean } = {};
  showToast = false;
  toastMessage = '';
  private timerInterval: any;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.updateTimerStrings();
    this.timerInterval = setInterval(() => {
      this.sales.forEach(sale => {
        if (sale.secondsLeft > 0) {
          sale.secondsLeft--;
        }
      });
      this.updateTimerStrings();
    }, 1000);
  }

  ngOnDestroy() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  toggleNotification(saleId: number, saleName: string) {
    this.notifiedSales[saleId] = !this.notifiedSales[saleId];
    this.toastMessage = this.notifiedSales[saleId] 
      ? `Notification set for ${saleName}!`
      : `Notification cancelled for ${saleName}`;
    
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
      this.cdr.detectChanges();
    }, 3000);
  }

  private updateTimerStrings() {
    this.sales.forEach(sale => {
      sale.timerString = this.formatTime(sale.secondsLeft);
    });
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
