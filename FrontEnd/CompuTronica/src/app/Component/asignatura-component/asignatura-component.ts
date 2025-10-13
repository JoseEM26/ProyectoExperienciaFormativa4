import { Component, OnInit, ViewChild } from '@angular/core';
import { AsignaturasService } from '../../Services/asignatura-service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { Asignatura } from '../../Model/asignatura-model/asignatura-model-module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AsignaturaFormComponent } from '../asignatura-form/asignatura-form';

@Component({
  selector: 'app-asignaturas-component',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    AsignaturaFormComponent, // <--- Esto es clave
  ],
  templateUrl: './asignaturas-component.html',
styleUrls: ['./asignaturas-component.css']
})
export class AsignaturasComponent implements OnInit {
  lstAsignaturas: Asignatura[] = [];
  loading: boolean = false;

  displayedColumns: string[] = ['id', 'codigo', 'nombre', 'creditos', 'profesor', 'acciones'];
  dataSource = new MatTableDataSource<Asignatura>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  searchText: string = '';
  timeout: any;

  // NUEVO: Modal y asignatura seleccionada
  asignaturaSeleccionada: Asignatura = new Asignatura(); // nunca undefined
  mostrarModal: boolean = false;

  constructor(private asignaturasService: AsignaturasService) {}

  ngOnInit(): void {
    this.cargarAsignaturas();
  }


  toggleInfo(asignatura: Asignatura) {
    asignatura.showInfo = !asignatura.showInfo;
  }

  cargarAsignaturas() {
    this.loading = true;
    this.asignaturasService.getAll().subscribe({
      next: (x) => {
        this.lstAsignaturas = x.map(a => ({ ...a, showInfo: false }));
        this.feedDataSource(x);
      },
      complete: () => (this.loading = false),
    });
  }

  // NUEVO: Abrir modal para nueva asignatura
  nuevaAsignatura() {
    this.asignaturaSeleccionada = new Asignatura();
    this.mostrarModal = true;
  }

  // NUEVO: Abrir modal para editar
  editarAsignatura(a: Asignatura) {
    this.asignaturaSeleccionada = new Asignatura({ ...a, isEditing: true });
    this.mostrarModal = true;
  }

  // NUEVO: Guardar asignatura (crear o actualizar)
  onGuardarAsignatura(asignatura: Asignatura) {
    if (asignatura.isEditing) {
      // Actualizar
      this.asignaturasService.update(asignatura.id!, asignatura).subscribe(() => {
        this.cargarAsignaturas();
      });
    } else {
      // Crear
      this.asignaturasService.create(asignatura).subscribe(() => {
        this.cargarAsignaturas();
      });
    }
    this.mostrarModal = false;
  }

  // NUEVO: Cancelar modal
  onCancelarAsignatura() {
    this.mostrarModal = false;
  }

  feedDataSource(data: Asignatura[]) {
    this.dataSource = new MatTableDataSource<Asignatura>(data);
    this.dataSource.paginator = this.paginator;
  }

  sortData(sort: Sort) {
    const data = this.lstAsignaturas.slice();
    if (!sort.active || sort.direction === '') {
      this.feedDataSource(data);
      return;
    }

    const sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id': return compare(a.id!, b.id!, isAsc);
        case 'codigo': return compare(a.codigoAsignatura, b.codigoAsignatura, isAsc);
        case 'nombre': return compare(a.nombre, b.nombre, isAsc);
        case 'creditos': return compare(a.creditos, b.creditos, isAsc);
        case 'profesor': return compare(a.profesor?.nombre || '', b.profesor?.nombre || '', isAsc);
        default: return 0;
      }
    });
    this.feedDataSource(sortedData);
  }

  onInputChange() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.filterData(), 300);
  }

  filterData() {
    const search = this.searchText.toLowerCase();
    if (!search) {
      this.feedDataSource(this.lstAsignaturas);
      return;
    }
    const filtered = this.lstAsignaturas.filter(a =>
      a.nombre.toLowerCase().includes(search) ||
      a.codigoAsignatura.toLowerCase().includes(search) ||
      (a.profesor && (a.profesor.nombre + ' ' + a.profesor.apellido).toLowerCase().includes(search))
    );
    this.feedDataSource(filtered);
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
