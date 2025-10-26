import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router ,RouterLink, RouterOutlet } from '@angular/router';

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
    { label: 'Dashboard', route: '/Dashboard', icon: 'bi-speedometer2' },
    { label: 'Usuarios', route: '/Usuarios', icon: 'bi-people' },
    { label: 'Asignatura', route: '/Asignatura', icon: 'bi-people' },
    { label: 'Calificaciones', route: '/Calificaciones', icon: 'bi-people' },
    { label: 'Chat', route: '/Chat', icon: 'bi-journal-text' },
  ];

 constructor(private router: Router) {}

  ngOnInit(): void {
    this.cargarUsuarioActual();
  }

  cargarUsuarioActual(): void {
    const usuarioStr = sessionStorage.getItem('usuario');
    if (usuarioStr) {
      try {
        const usuario = JSON.parse(usuarioStr);
        this.userName = `${usuario.nombre} ${usuario.apellido}`;

      } catch (error) {
        console.error('Error al cargar usuario:', error);
        this.logout();
      }
    } else {
       this.router.navigate(['/login']);
    }
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  logout(): void {
    const confirmar = confirm('¿Estás seguro que deseas cerrar sesión?');
    if (confirmar) {
      sessionStorage.clear();
      this.router.navigate(['/login']);
    }
  }
}
