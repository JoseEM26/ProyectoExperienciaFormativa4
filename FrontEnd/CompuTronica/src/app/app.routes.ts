import { Routes } from '@angular/router';
import { NotFoundComponent } from './Templates/not-found-component/not-found-component';
import { LoginComponent } from './Component/login-component/login-component';
import { DashBoardCOmponent } from './Component/dash-board-component/dash-board-component';
import { UsuariosComponent } from './Component/usuarios-component/usuarios-component';
import { AsignaturasComponent } from './Component/asignatura-component/asignatura-component';
import { RegistroUsuario } from './Component/usuario-form-component/usuario-form';

export const routes: Routes = [
  { path: '', redirectTo: '/DashBoard', pathMatch: 'full' },
  { path: 'DashBoard', component: DashBoardCOmponent },
  { path: 'Asignatura', component: AsignaturasComponent },
  { path: 'Usuarios', component: UsuariosComponent },

  { path: 'usuarioForm', component: RegistroUsuario },
  { path: 'usuarioForm/:codigoInstitucional', component: RegistroUsuario },

  { path: '**', component: NotFoundComponent } // Ruta para páginas no encontradas
];
