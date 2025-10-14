import { LoginRequest, LoginResponse, LoginService } from './../../Services/login-service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';


@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css'
})
export class LoginComponent {
  codigoInstitucional: string = '';
  contrasena: string = '';
  loading: boolean = false;
  errorMessage: string = '';
  hidePassword: boolean = true;

  constructor(
    private LoginService: LoginService,
    private router: Router
  ) {}

  login() {
    if (!this.codigoInstitucional.trim() || !this.contrasena.trim()) {
      this.errorMessage = 'Por favor, complete todos los campos';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const loginData: LoginRequest = {
      codigoInstitucional: this.codigoInstitucional.trim(),
      contrasena: this.contrasena
    };

    this.LoginService.login(loginData).subscribe({
      next: (response: LoginResponse) => {
        console.log('Login exitoso:', response);

        sessionStorage.setItem('usuario', JSON.stringify(response));
        sessionStorage.setItem('isLoggedIn', 'true');

        // Redirigir según el tipo de usuario
        if (response.tipo === 'administrativo') {
          this.router.navigate(['/Usuarios']);
        } else {
          this.router.navigate(['/DashBoard']);
        }
      },
      error: (error) => {
        console.error('Error en login:', error);
        this.loading = false;

        if (error.status === 401) {
          this.errorMessage = 'Código o contraseña incorrectos';
        } else if (error.status === 404) {
          this.errorMessage = 'Usuario no encontrado';
        } else if (error.status === 0) {
          this.errorMessage = 'No se puede conectar con el servidor';
        } else {
          this.errorMessage = 'Error al iniciar sesión. Intente nuevamente';
        }
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
}
