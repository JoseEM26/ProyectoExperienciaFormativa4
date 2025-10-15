// asignatura-form.component.ts
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Asignatura } from '../../Model/asignatura-model-module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { UsuarioService } from '../../Services/usuario-service';
import { Usuario } from '../../Model/usuario-model';

@Component({
  selector: 'app-asignatura-form',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatInputModule],
  templateUrl: './asignatura-form.html',
  styleUrls: ['./asignatura-form.css']
})
export class AsignaturaFormComponent implements OnInit {
  @Input() asignatura!: Asignatura; // El objeto a editar o nuevo
  @Output() guardar = new EventEmitter<Asignatura>();
  @Output() cancelar = new EventEmitter<void>();

  profesores: Usuario[] = []; // lista para el combo

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    // Traer todos los profesores
    this.usuarioService.getProfesores().subscribe({
      next: (res) => {
        this.profesores = res;
        // Si no hay profesor asignado, inicializar con el primero
      if (!this.asignatura.profesor && this.profesores.length > 0) {
      const u = this.profesores[0];
      this.asignatura.profesor = {
    id: u.id ?? 0,        // si u.id es undefined, ponemos 0
    nombre: u.nombre,
    apellido: u.apellido,
  };
}

      },
      error: (err) => console.error('Error cargando profesores', err)
    });
  }

  onGuardar() {
    // Validación básica
    if (!this.asignatura.nombre || !this.asignatura.codigoAsignatura || !this.asignatura.profesor) {
      alert('Nombre, código y profesor son obligatorios');
      return;
    }
    this.guardar.emit(this.asignatura);
  }

  onCancelar() {
    this.cancelar.emit();
  }
}
