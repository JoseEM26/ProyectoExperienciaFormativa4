import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { Calificacion } from '../../Model/calificaciones-model';
import { CalificacionesService } from '../../Services/calificaciones-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { CrearEditarCalificacionComponent } from '../crear-calificaciones/crear-calificaciones';

@Component({
  selector: 'app-calificaciones-component',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './calificaciones-component.html',
  styleUrls: ['./calificaciones-component.css']
})
export class CalificacionesComponent implements OnInit {

  lstCalificaciones: any[] = [];
displayedColumns: string[] = ['estudiante', 'asignatura', 'parcial', 'final', 'resultado'];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  searchText: string = '';
  timeout: any;
  loading: boolean = false;

  constructor(
    private calificacionesService: CalificacionesService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.cargarCalificaciones();
  }

  cargarCalificaciones() {
    this.loading = true;
    this.calificacionesService.getAll().subscribe({
      next: (res: any) => {
        const calificaciones: Calificacion[] = res.data;

        type CalMap = {
          estudiante: string;
            asignatura: string; // nuevo campo
          parcial: number;
          final: number;
          ids: { parcial: number | null; final: number | null };
        };

        const map: Record<string, CalMap> = {};

        calificaciones.forEach(c => {
  if (!c.estudiante || !c.asignatura) return;
  const nombre = `${c.estudiante.nombre} ${c.estudiante.apellido}`;
  const asignaturaNombre = c.asignatura.nombre; // asumiendo que tu modelo tiene .nombre

  const key = nombre + '-' + asignaturaNombre; // clave única por estudiante y asignatura

  if (!map[key]) {
    map[key] = {
      estudiante: nombre,
      asignatura: asignaturaNombre,
      parcial: 0,
      final: 0,
      ids: { parcial: null, final: null }
    };
  }

  if (c.evaluacion.toLowerCase() === 'parcial') {
    map[key].parcial = c.nota;
    map[key].ids.parcial = c.id ?? null;
  } else if (c.evaluacion.toLowerCase() === 'final') {
    map[key].final = c.nota;
    map[key].ids.final = c.id ?? null;
  }
});

        this.lstCalificaciones = Object.values(map).map((c: CalMap) => ({
          ...c,
          resultado: c.parcial + c.final
        }));

        this.feedDataSource(this.lstCalificaciones);
      },
      error: (err) => console.error(err),
      complete: () => this.loading = false
    });
  }

  feedDataSource(data: any[]) {
    this.dataSource = new MatTableDataSource<any>(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  sortData(sort: Sort) {
    const data = this.lstCalificaciones.slice();
    if (!sort.active || sort.direction === '') {
      this.feedDataSource(data);
      return;
    }
    const sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'estudiante': return compare(a.estudiante, b.estudiante, isAsc);
        case 'parcial': return compare(a.parcial, b.parcial, isAsc);
        case 'final': return compare(a.final, b.final, isAsc);
        case 'resultado': return compare(a.resultado, b.resultado, isAsc);
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
      this.feedDataSource(this.lstCalificaciones);
      return;
    }
    const filtered = this.lstCalificaciones.filter(c =>
      c.estudiante.toLowerCase().includes(search)
    );
    this.feedDataSource(filtered);
  }

  getNotaPromedio(cal: any): number {
    return Math.floor((cal.parcial + cal.final) / 2);
  }

  abrirCrearCalificacion() {
    const dialogRef = this.dialog.open(CrearEditarCalificacionComponent, {
      width: '450px'
    });

    const instance = dialogRef.componentInstance;
    instance.calificacion = new Calificacion();
    instance.guardar.subscribe((nuevaCalificacion: Calificacion) => {
      this.calificacionesService.create(nuevaCalificacion).subscribe({
        next: () => {
          this.cargarCalificaciones();
          dialogRef.close();
        },
        error: err => console.error(err)
      });
    });
    instance.cancelar.subscribe(() => dialogRef.close());
  }

  abrirEditarCalificacion(calId: number | null) {
  if (calId == null) return;
  this.calificacionesService.getById(calId).subscribe({
    next: (response: any) => {
      const calEditada: Calificacion = response.data; // ⚠️ Importante: extraer del response
      if (!calEditada) return;

      const dialogRef = this.dialog.open(CrearEditarCalificacionComponent, {
        width: '450px',
        data: { calificacion: calEditada } // ✅ Pasar datos así
      });

      dialogRef.componentInstance.guardar.subscribe((editada: Calificacion) => {
        if (!editada.id) return;
        this.calificacionesService.update(editada.id, editada).subscribe({
          next: () => {
            this.cargarCalificaciones();
            dialogRef.close();
          },
          error: err => console.error(err)
        });
      });

      dialogRef.componentInstance.cancelar.subscribe(() => dialogRef.close());
    },
    error: err => console.error(err)
  });
}


  confirmarEliminar(calId: number | null, estudiante: string) {
    if (!calId) return;
    const confirmacion = confirm(`¿Estás seguro que deseas eliminar la calificación de ${estudiante}?`);
    if (confirmacion) {
      this.calificacionesService.delete(calId).subscribe({
        next: () => this.cargarCalificaciones(),
        error: err => console.error(err)
      });
    }
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
