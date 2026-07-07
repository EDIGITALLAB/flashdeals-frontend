import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProfileSidebar } from '../../components/profile-sidebar/profile-sidebar';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule, RouterLink, ProfileSidebar],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  selectedTab: string = 'personal';
  mobileView: 'sidebar' | 'details' = 'sidebar'; // mobile pe sidebar ya details dikhe

  // Personal Info Form Model
  personalInfo = {
    firstName: 'Rahul',
    lastName: 'Sharma',
    email: 'rahul.sharma@email.com',
    phone: '+91 98765 43210',
    gender: 'male',
    dob: '1995-08-15'
  };

  isEditingPersonal: boolean = false;

  // Addresses List
  addresses = [
    {
      id: 1,
      type: 'Home',
      name: 'Rahul Sharma',
      addressLine: 'House No. 12, 3rd Cross, Sector 4, HSR Layout',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560102',
      phone: '+91 98765 43210',
      isDefault: true
    },
    {
      id: 2,
      type: 'Work',
      name: 'Rahul Sharma',
      addressLine: 'Building B, Prestige Tech Park, Outer Ring Road, Marathahalli',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560103',
      phone: '+91 98765 43210',
      isDefault: false
    }
  ];

  // Payment Methods
  paymentCards = [
    {
      id: 1,
      bank: 'HDFC Bank',
      type: 'Credit Card',
      number: '4321',
      expiry: '08/29',
      cardType: 'visa'
    },
    {
      id: 2,
      bank: 'ICICI Bank',
      type: 'Debit Card',
      number: '8765',
      expiry: '12/31',
      cardType: 'mastercard'
    }
  ];

  // App preferences
  preferences = {
    darkMode: false,
    language: 'en',
    currency: 'INR'
  };

  // Notification toggles
  notifications = {
    email: true,
    push: true,
    sms: false,
    whatsapp: true
  };

  // Interests categories list
  interests = [
    { name: 'Fashion', selected: true },
    { name: 'Electronics', selected: true },
    { name: 'Home & Living', selected: false },
    { name: 'Beauty', selected: true },
    { name: 'Food & Dining', selected: false },
    { name: 'Travel', selected: false },
    { name: 'Fitness Gear', selected: true }
  ];

  onTabChange(tab: string) {
    this.selectedTab = tab;
    this.mobileView = 'details'; // mobile pe details panel pe ja
  }

  goBackToSidebar() {
    this.mobileView = 'sidebar'; // mobile pe wapas sidebar pe aa
  }

  savePersonal() {
    this.isEditingPersonal = false;
    alert('Personal information updated successfully!');
  }

  toggleInterest(index: number) {
    this.interests[index].selected = !this.interests[index].selected;
  }
}
