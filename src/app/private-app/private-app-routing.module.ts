import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';
import { DirectorComponent } from './components/director/director.component';
import { VSO003Component } from './formularios/components/VSO-003/vso-003.component';
import { SeguimientoEvaluacionComponent } from './components/director/seguimiento-evaluacion/seguimiento-evaluacion.component';
import { ResumenPracticaComponent } from './components/student/resumen-practica/resumen-practica.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
  },
  {
    path: 'estudiante',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    data: { expectedRoles: 'ESTUDIANTE' },
    loadChildren: () =>
      import('./estudiante/estudiante.module').then(
        (m) =>m.EstudianteModule
      )
  },
  {
    path: 'representante-practicas',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    data: { expectedRoles: 'REPRESENTANTE PRÁCTICAS' },
    loadChildren: () =>
      import('./representante-practicas/representante-practicas.module').then(
        (m) => m.RepresentantePracticasModule
      )
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
        path: 'informacion-practica/:id',
        component: ResumenPracticaComponent,
        title: 'Resumen Práctica',
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
    path: 'administrar-usuarios',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    data: { expectedRoles: 'ADMINISTRADOR' },
    loadChildren: () =>
      import('./administrar-usuarios/administrar-usuarios.module').then(
        (m) => m.AdministrarUsuariosModule
      )
  },
  {
    path: 'administrar-catalogos',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    data: { expectedRoles: 'ADMINISTRADOR' },
    loadChildren: () =>
      import('./administrar-catalogos/administrar-catalogos.module').then(
        (m) => m.AdministrarCatalogosModule
      )
  },
  {
    path: 'administrar-organizaciones',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    data: { expectedRoles: 'ADMINISTRADOR' },
    loadChildren: () =>
      import('./administrar-organizaciones/administrar-organizaciones.module').then(
        (m) => m.AdministrarOrganizacionesModule
      )
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
