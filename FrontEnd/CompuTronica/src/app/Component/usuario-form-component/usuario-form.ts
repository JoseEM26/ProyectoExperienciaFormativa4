import { UsuarioCreate } from './../../Model/usuario-model-create';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { NgSelectComponent } from "@ng-select/ng-select";
import Swal from 'sweetalert2';
import { LoadingComponent } from '../../Templates/loading-component/loading-component';
import { UsuarioService } from '../../Services/usuario-service';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, NgSelectComponent, LoadingComponent],
  templateUrl: './usuario-form.html',
  styleUrl: './usuario-form.css'
})
export class RegistroUsuario implements OnInit {
  registroUsuario!: FormGroup;
  loading = false;
  esEdicion = false;
  codigoInstitucional?: string;

  tipos = [
    { value: 'Estudiante', label: 'Estudiante' },
    { value: 'Profesor', label: 'Profesor' },
    { value: 'Administrador', label: 'Administrador' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _us: UsuarioService
  ) {}

  ngOnInit(): void {
    this.registroUsuario = this.fb.group({
      codigoInstitucional: ['', [Validators.required, Validators.minLength(5)]],
      sede: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      contrasena: ['', this.esEdicion ? [] : [Validators.required, Validators.minLength(6)]], // 🔹 contraseña
      correoInstitucional: ['', [Validators.required, Validators.email]],
      tipo: ['', Validators.required],
      estado: [true]
    });

    // Detectar modo edición
    this.route.paramMap.subscribe(params => {
      const codigoParam = params.get('codigoInstitucional');
      if (codigoParam) {
        this.esEdicion = true;
        this.codigoInstitucional = codigoParam;
        this.cargarUsuario(this.codigoInstitucional);
        this.registroUsuario.get('contrasena')?.clearValidators(); // No requerir en edición
        this.registroUsuario.get('contrasena')?.updateValueAndValidity();
      }
    });
  }

  cargarUsuario(codigoInstitucional: string): void {
    this.loading = true;
    this._us.getByCodigoInstitucional(codigoInstitucional).subscribe({
      next: (data) => {
        this.registroUsuario.patchValue(data);
      },
      error: (err) => {
        console.error('Error cargando usuario:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error al cargar usuario',
          text: err.error?.message || 'Intente nuevamente más tarde'
        });
        this.router.navigate(['/usuario']);
      },
      complete: () => this.loading = false
    });
  }

  showError(controlName: string): boolean {
    const control = this.registroUsuario.get(controlName);
    return !!(control && control.touched && control.invalid);
  }

  getErrorMessage(controlName: string): string {
    const control = this.registroUsuario.get(controlName);
    if (!control?.errors) return '';

    if (control.hasError('required')) return 'Este campo es obligatorio.';
    if (control.hasError('email')) return 'Ingrese un correo válido.';
    if (control.hasError('minlength'))
      return `Debe tener al menos ${control.getError('minlength').requiredLength} caracteres.`;
    return 'Campo inválido.';
  }

  createUsuario() {
    if (this.registroUsuario.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Formulario inválido',
        text: 'Por favor, completa todos los campos correctamente.',
      });
      return;
    }

    const datos: UsuarioCreate = this.registroUsuario.getRawValue();
    const esActualizacion = this.esEdicion;

    console.log('Formulario enviado:', datos);

    this._us.createUsuario(datos).subscribe({
      next: () => {
        Swal.fire({
          toast: true,
          icon: 'success',
          title: esActualizacion
            ? 'Usuario actualizado con éxito'
            : 'Usuario registrado con éxito',
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
        });
        this.router.navigate(['/usuario']);
      },
      error: (err) => {
        console.error('Error creando usuario:', err);
        if (err.status === 409) {
          Swal.fire({
            icon: 'warning',
            title: 'Código institucional duplicado',
            text: 'Ya existe un usuario con este código.',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error al guardar',
            text: err.error?.message || 'Intenta de nuevo más tarde',
          });
        }
      },
    });
  }
}
