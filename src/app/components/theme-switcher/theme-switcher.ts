import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService, ThemeColor } from '../../services/theme.service';

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './theme-switcher.html',
  styleUrl: './theme-switcher.css'
})
export class ThemeSwitcher {
  constructor(public themeService: ThemeService) {}

  selectColor(color: ThemeColor) {
    this.themeService.setColor(color.id);
  }

  toggleDark() {
    this.themeService.toggleDarkMode();
  }

  close() {
    this.themeService.closePanel();
  }

  toggle() {
    this.themeService.togglePanel();
  }

  reset() {
    this.themeService.resetTheme();
  }
}

