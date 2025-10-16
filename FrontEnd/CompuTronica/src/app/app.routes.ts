import { Routes } from '@angular/router';
import { NotFoundComponent } from './Templates/not-found-component/not-found-component';
import { LoginComponent } from './Component/login-component/login-component';
import { DashBoardCOmponent } from './Component/dash-board-component/dash-board-component';
import { UsuariosComponent } from './Component/usuarios-component/usuarios-component';
import { AsignaturasComponent } from './Component/asignatura-component/asignatura-component';
import { RegistroUsuario } from './Component/usuario-form-component/usuario-form';
import { AsignaturaComponent } from './Component/asignatura-component/asignatura-component';
import { authGuard } from './Guards/auth-guard';
import { authenticateGuardGuard } from './Guards/authenticateGuardGuard';

export const routes: Routes = [
  // 🔐 Login fuera del layout
  { path: 'login', component: LoginComponent, canActivate: [authenticateGuardGuard] },

  // 🌐 Rutas protegidas dentro del layout
  {
    path: '',
    component: LayaoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'DashBoard', pathMatch: 'full' },
      { path: 'DashBoard', component: DashBoardCOmponent, data: { title: 'Dashboard' } },
      { path: 'Asignatura', component: AsignaturaComponent, data: { title: 'Asignaturas' } },
      { path: 'Usuarios', component: UsuariosComponent, data: { title: 'Usuarios' } },
      { path: 'Chat', component: ChatComponent, data: { title: 'Chat' } },
    ]
  },
  // 🚫 Ruta por defecto o no encontrada
  { path: '**', component: NotFoundComponent }
  { path: '', redirectTo: '/DashBoard', pathMatch: 'full' },
  { path: 'DashBoard', component: DashBoardCOmponent },
  { path: 'Asignatura', component: AsignaturasComponent },
  { path: 'Usuarios', component: UsuariosComponent },

  { path: 'usuarioForm', component: RegistroUsuario },
  { path: 'usuarioForm/:codigoInstitucional', component: RegistroUsuario },

  { path: '**', component: NotFoundComponent } // Ruta para páginas no encontradas
];
