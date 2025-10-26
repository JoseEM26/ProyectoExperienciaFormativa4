import { Component, EventEmitter, Inject, Output, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Calificacion } from '../../Model/calificaciones-model';
import { UsuarioService } from '../../Services/usuario-service';
import { AsignaturasService } from '../../Services/asignatura-service';
import { Usuario } from '../../Model/usuario-model';
import { Asignatura } from '../../Model/asignatura-model-module';

@Component({
  selector: 'app-crear-editar-calificacion',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatInputModule, MatSelectModule],
  templateUrl: './crear-calificaciones.html',
  styleUrls: ['./crear-calificaciones.css']
})
export class CrearEditarCalificacionComponent implements OnInit {

  calificacion!: Calificacion;
  @Output() guardar = new EventEmitter<Calificacion>();
  @Output() cancelar = new EventEmitter<void>();

  estudiantes: Usuario[] = [];
  asignaturas: Asignatura[] = [];
  evaluaciones: ('Parcial' | 'Final')[] = ['Parcial', 'Final'];

  // Variables auxiliares para los selects
  selectedEstudiante: Usuario | null = null;
  selectedAsignatura: Asignatura | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private usuarioService: UsuarioService,
    private asignaturasService: AsignaturasService
  ) {
    // Inicializar con los datos recibidos o crear nuevo
    this.calificacion = data?.calificacion ? { ...data.calificacion } : new Calificacion();
  }

  ngOnInit(): void {
    // Cargar estudiantes
    this.usuarioService.getEstudiantes().subscribe({
      next: res => {
        this.estudiantes = res;

        // Si estamos editando, encontrar el estudiante seleccionado
        if (this.calificacion.estudiante?.id) {
          this.selectedEstudiante = this.estudiantes.find(e => e.id === this.calificacion.estudiante.id) || null;
        }

        // Si es nuevo y no hay selección, seleccionar el primero
        if (!this.calificacion.id && !this.selectedEstudiante && this.estudiantes.length > 0) {
          this.selectedEstudiante = this.estudiantes[0];
          this.updateEstudianteData();
        }
      },
      error: err => console.error('Error cargando estudiantes', err)
    });

    // Cargar asignaturas
    this.asignaturasService.getAll().subscribe({
      next: res => {
        this.asignaturas = res;

        // Si estamos editando, encontrar la asignatura seleccionada
        if (this.calificacion.asignatura?.id) {
          this.selectedAsignatura = this.asignaturas.find(a => a.id === this.calificacion.asignatura.id) || null;
        }

        // Si es nuevo y no hay selección, seleccionar la primera
        if (!this.calificacion.id && !this.selectedAsignatura && this.asignaturas.length > 0) {
          this.selectedAsignatura = this.asignaturas[0];
          this.updateAsignaturaData();
        }
      },
      error: err => console.error('Error cargando asignaturas', err)
    });

    // Inicializar evaluación si no tiene
    if (!this.calificacion.evaluacion) this.calificacion.evaluacion = 'Parcial';
  }

  // Actualizar datos del estudiante cuando cambia la selección
  onEstudianteChange() {
    this.updateEstudianteData();
  }

  // Actualizar datos de la asignatura cuando cambia la selección
  onAsignaturaChange() {
    this.updateAsignaturaData();
  }

  private updateEstudianteData() {
    if (this.selectedEstudiante && this.selectedEstudiante.id !== undefined) {
      this.calificacion.estudiante = {
        id: this.selectedEstudiante.id,
        nombre: this.selectedEstudiante.nombre,
        apellido: this.selectedEstudiante.apellido,
        correoInstitucional: this.selectedEstudiante.correoInstitucional
      };
    }
  }

  private updateAsignaturaData() {
    if (this.selectedAsignatura && this.selectedAsignatura.id !== undefined) {
      this.calificacion.asignatura = {
        id: this.selectedAsignatura.id,
        codigoAsignatura: this.selectedAsignatura.codigoAsignatura,
        nombre: this.selectedAsignatura.nombre
      };
    }
  }

  onGuardar() {
    // Asegurar que se actualicen los datos antes de guardar
    this.updateEstudianteData();
    this.updateAsignaturaData();

    if (!this.calificacion.estudiante || !this.calificacion.asignatura || !this.calificacion.nota) {
      alert('Todos los campos son obligatorios');
      return;
    }
    this.guardar.emit(this.calificacion);
  }

  onCancelar() {
    this.cancelar.emit();
  }

  compareUsuarios(u1: Usuario, u2: Usuario): boolean {
    return u1 && u2 ? u1.id === u2.id : u1 === u2;
  }

  compareAsignaturas(a1: Asignatura, a2: Asignatura): boolean {
    return a1 && a2 ? a1.id === a2.id : a1 === a2;
  }
}
