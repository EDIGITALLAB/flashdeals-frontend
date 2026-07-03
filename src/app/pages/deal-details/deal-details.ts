import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Breadcrumb } from '../../components/breadcrumb/breadcrumb';

@Component({
  selector: 'app-deal-details',
  imports: [CommonModule, RouterLink, Breadcrumb],
  templateUrl: './deal-details.html',
  styleUrl: './deal-details.css',
})
export class DealDetails implements OnInit, OnDestroy {
  selectedImage = '/nike_shoe.png';
  secondsLeft = 8076; // 2 hours, 14 mins, 36 secs
  timerInterval: any;

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
