import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';
import { AdminComponent } from './components/admin/admin.component';
import { OrganizationComponent } from './components/organization/organization.component';
import { StudentComponent } from './components/student/student.component';
import { DirectorComponent } from './components/director/director.component';

const routes: Routes = [
  {
    path: 'student',
    component: StudentComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    data: { expectedRoles: 'ESTUDIANTE' },
  },
  {
    path: 'formularios',
    loadChildren: () =>
      import('./formularios/formularios.module').then(
        (m) => m.FormulariosModule
      ),
    canLoad: [AuthGuard],
    data: {
      expectedRoles: 'ESTUDIANTE,REPRESENTANTE PRÁCTICAS,DIRECTOR DE CARRERA',
    },
  },
  {
    path: 'reportes',
    loadChildren: () =>
      import('./reportes/reportes.module').then((m) => m.ReportesModule),
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    data: { expectedRoles: 'ADMINISTRADOR' },
  },
  {
    path: 'organization',
    component: OrganizationComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    data: { expectedRoles: 'REPRESENTANTE PRÁCTICAS' },
  },
  {
    path: 'director',
    component: DirectorComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    data: { expectedRoles: 'DIRECTOR DE CARRERA' },
  },
  {
    path: 'administrar-usuarios',
    loadChildren: () =>
      import('./administrar-usuarios/administrar-usuarios.module').then(
        (m) => m.AdministrarUsuariosModule
      ),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivateAppRoutingModule {}
