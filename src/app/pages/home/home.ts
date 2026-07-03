import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainSidebar } from '../../components/main-sidebar/main-sidebar';
import { Navbar } from '../../components/navbar/navbar';

interface Deal {
  id: number;
  brand: string;
  logoType: 'puma' | 'boat' | 'myntra' | 'swiggy';
  discount: string;
  storeName: string;
  status: 'Online' | 'Offline';
  secondsLeft: number;
  timerString?: string;
}

@Component({
  selector: 'app-home',
  imports: [CommonModule, MainSidebar, Navbar],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, OnDestroy {
  deals: Deal[] = [
    { id: 1, brand: 'Puma', logoType: 'puma', discount: 'Min. 60% Off', storeName: 'Puma Store', status: 'Online', secondsLeft: 2 * 3600 + 14 * 60 + 36 },
    { id: 2, brand: 'boAt', logoType: 'boat', discount: 'Up to 70% Off', storeName: 'boAt Lifestyle', status: 'Online', secondsLeft: 4 * 3600 + 30 * 60 + 12 },
    { id: 3, brand: 'Myntra', logoType: 'myntra', discount: '40-80% Off', storeName: 'Myntra Fashion', status: 'Online', secondsLeft: 5 * 3600 + 45 * 60 + 22 },
    { id: 4, brand: 'Swiggy', logoType: 'swiggy', discount: 'Flat 50% Off', storeName: 'On Food Orders', status: 'Online', secondsLeft: 1 * 3600 + 10 * 60 + 5 }
  ];

  private intervalId: any;

  ngOnInit() {
    this.updateTimers();
    this.intervalId = setInterval(() => {
      this.deals.forEach(deal => {
        if (deal.secondsLeft > 0) {
          deal.secondsLeft--;
        }
      });
      this.updateTimers();
    }, 1000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private updateTimers() {
    this.deals.forEach(deal => {
      deal.timerString = this.formatTime(deal.secondsLeft);
    });
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

