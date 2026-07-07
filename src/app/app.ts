import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MobileNav } from './components/mobile-nav/mobile-nav';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MobileNav],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('flashdeals');
}
