import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layaout-component',
  standalone: true, // 🔹 necesario en Angular standalone
 imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './layaout-component.html',
  styleUrl: './layaout-component.css'
})
export class LayaoutComponent {
userName = 'Juan Pérez';
  sidebarOpen = true;

  menuItems = [
    { label: 'DashBoard', route: '/DashBoard', icon: 'bi-speedometer2' },
    { label: 'Usuarios', route: '/Usuarios', icon: 'bi-people' },
    { label: 'Asignatura', route: '/Asignatura', icon: 'bi-people' },
    { label: 'Chat', route: '/Chat', icon: 'bi-journal-text' },
  ];

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
