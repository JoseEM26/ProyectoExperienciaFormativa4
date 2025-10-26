import { Routes } from '@angular/router';
import { NotFoundComponent } from './Templates/not-found-component/not-found-component';
import { LoginComponent } from './Component/login-component/login-component';
import { UsuariosComponent } from './Component/usuarios-component/usuarios-component';
import { AsignaturasComponent } from './Component/asignatura-component/asignatura-component';
import { RegistroUsuario } from './Component/usuario-form-component/usuario-form';
import { ChatComponent } from './Component/chat-component/chat-component';
import { CalificacionesComponent } from './Component/calificaciones-component/calificaciones-component';
import { authGuard } from './Guards/auth-guard';
import { authenticateGuardGuard } from './Guards/authenticateGuardGuard';
import { DashBoardComponent } from './Component/dash-board-component/dash-board-component';
import { LayaoutComponent } from './Templates/layaout-component/layaout-component';

export const routes: Routes = [
  // 🔐 Login fuera del layout
  { path: 'login', component: LoginComponent, canActivate: [authenticateGuardGuard] },

  // 🌐 Rutas protegidas dentro del layout
  {
    path: '',
    component: LayaoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'Dashboard', pathMatch: 'full' },
      { path: 'Dashboard', component: DashBoardComponent, data: { title: 'Dashboard' } },
      { path: 'Asignatura', component: AsignaturasComponent, data: { title: 'Asignaturas' } },
      { path: 'Calificaciones', component: CalificacionesComponent, data: { title: 'Calificaciones' } },
      { path: 'Usuarios', component: UsuariosComponent, data: { title: 'Usuarios' } },
      { path: 'Chat', component: ChatComponent, data: { title: 'Chat' } },
      { path: 'usuarioForm', component: RegistroUsuario },
      { path: 'usuarioForm/:codigoInstitucional', component: RegistroUsuario },
    ]
  },

  // 🚫 Ruta por defecto o no encontrada
  { path: '**', component: NotFoundComponent }
];
