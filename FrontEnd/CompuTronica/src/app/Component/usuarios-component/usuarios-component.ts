import { UsuarioService } from './../../Services/usuario-service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoadingComponent } from '../../Templates/loading-component/loading-component';
import { RouterLink } from '@angular/router';
import { Usuario } from '../../Model/usuario-model';

@Component({
  selector: 'app-usuarios-component',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LoadingComponent,
    RouterLink,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSlideToggleModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './usuarios-component.html',
  styleUrls: ['./usuarios-component.css'],
})
export class UsuariosComponent implements OnInit {
  lstUsuarios: Usuario[] = [];
  loading: boolean = false;

  displayedColumns: string[] = ['id', 'codigoInstitucional', 'nombreCompleto', 'correoInstitucional', 'tipo', 'estado'  ];
  ListUsuarioDataSource = new MatTableDataSource<Usuario>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  searchText: string = '';
  timeout: any;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.loading = true;
    this.usuarioService.getAll().subscribe({
      next: (x) => {
        this.lstUsuarios = x;
        this.feedDataSource(x);
      },
      complete: () => (this.loading = false),
    });
  }

  cambiarEstado(id: number) {
    // this.usuarioService.cambiarEstado(id).subscribe({
    //   next: (res) => {
    //     console.log('Estado cambiado:', res);
    //   },
    //   error: (err) => console.error('Error al cambiar estado:', err),
    // });
  }

  feedDataSource(data: Usuario[]) {
    this.ListUsuarioDataSource = new MatTableDataSource<Usuario>(data);
    this.ListUsuarioDataSource.paginator = this.paginator;
  }

  sortData(sort: Sort) {
    const data = this.lstUsuarios.slice();
    if (!sort.active || sort.direction === '') {
      this.feedDataSource(data);
      return;
    }

    const sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return compare(a.id!, b.id!, isAsc);
        case 'codigoInstitucional':
          return compare(a.codigoInstitucional, b.codigoInstitucional, isAsc);
        case 'nombreCompleto':
          return compare(a.nombre + ' ' + a.apellido, b.nombre + ' ' + b.apellido, isAsc);
        case 'correoInstitucional':
          return compare(a.correoInstitucional, b.correoInstitucional, isAsc);
        case 'tipo':
          return compare(a.tipo, b.tipo, isAsc);
        default:
          return 0;
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
      this.feedDataSource(this.lstUsuarios);
      return;
    }
    const filtered = this.lstUsuarios.filter(
      (u) =>
        u.nombre.toLowerCase().includes(search) ||
        u.apellido.toLowerCase().includes(search) ||
        u.correoInstitucional.toLowerCase().includes(search)
    );
    this.feedDataSource(filtered);
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
