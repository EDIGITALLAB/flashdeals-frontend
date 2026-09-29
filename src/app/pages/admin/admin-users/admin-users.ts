import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-users.html',
  styleUrl: './admin-users.css'
})
export class AdminUsers {
  users = [
    { id: 1, name: 'Rahul Sharma', email: 'rahul.sharma@email.com', role: 'User', status: 'Active', joined: '12 Jan 2025' },
    { id: 2, name: 'Priya Patel', email: 'priya.patel@email.com', role: 'User', status: 'Active', joined: '15 Feb 2025' },
    { id: 3, name: 'Amit Kumar', email: 'admin@flashdeals.com', role: 'Super Admin', status: 'Active', joined: '01 Jan 2025' },
    { id: 4, name: 'Sneha Verma', email: 'sneha.v@email.com', role: 'User', status: 'Inactive', joined: '20 Mar 2025' }
  ];
}
