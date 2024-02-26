import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';
import { AdminComponent } from './components/admin/admin.component';
import { OrganizationComponent } from './components/organization/organization.component';
import { StudentComponent } from './components/student/student.component';
import { DirectorComponent } from './components/director/director.component';
import { CartaCompromisoComponent } from './formularios/components/carta-compromiso/carta-compromiso.component';
import { VSO001Component } from './formularios/components/VSO-001/vso-001.component';
import { VSO002Component } from './formularios/components/VSO-002/vso-002.component';
import { VSO004Component } from './formularios/components/VSO-004/vso-004.component';
import { VSO003Component } from './formularios/components/VSO-003/vso-003.component';
import { VSO005Component } from './formularios/components/VSO-005/vso-005.component';
import { SeguimientoEvaluacionComponent } from './components/director/seguimiento-evaluacion/seguimiento-evaluacion.component';
import { ResumenPracticaComponent } from './components/student/resumen-practica/resumen-practica.component';

const routes: Routes = [
  {
    path: 'estudiante',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    data: { expectedRoles: 'ESTUDIANTE' },
    children: [
      {
        path: '',
        component: StudentComponent,
        title: 'Inicio',
      },
      {
        path: 'carta-compromiso',
        component: CartaCompromisoComponent,
        title: 'Carta Compromiso',
      },
      {
        path: 'solicitud',
        component: VSO001Component,
        title: 'Solictud de Prácticas Preprofesionales',
      },
      {
        path: 'informe-final',
        component: VSO005Component,
        title: 'Informe Final',
      },
      {
        path: 'resumen-practica',
        component: ResumenPracticaComponent,
        title: 'Resumen',
      },
      {
        path: '**',
        component: StudentComponent,
        title: 'Inicio',
      },
    ],
  },
  {
    path: 'representante',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    data: { expectedRoles: 'REPRESENTANTE PRÁCTICAS' },
    children: [
      {
        path: '',
        component: OrganizationComponent,
        title: 'Inicio',
      },
      {
        path: 'compromiso-recepcion/:id',
        component: VSO002Component,
        title: 'Compromiso de Recepción',
      },
      {
        path: 'seguimiento-evaluacion/:id',
        component: VSO004Component,
        title: 'Seguimiento y Evaluación',
      },
      {
        path: '**',
        component: OrganizationComponent,
        title: 'Inicio'
      }
    ]
  },
  {
    path: 'director',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    data: { expectedRoles: 'DIRECTOR DE CARRERA' },
    children: [
      {
        path: '',
        component: DirectorComponent,
        title: 'Inicio',
      },
      {
        path: 'seguimiento-evaluacion',
        component: SeguimientoEvaluacionComponent,
        title: 'Inicio',
      },
      {
        path: 'seguimiento-evaluacion/:id',
        component: VSO003Component,
        title: 'Seguimiento y Evaluación',
      },
      {
        path: '**',
        component: DirectorComponent,
        title: 'Inicio'
      }
    ]
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
