import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VSO002Component } from '../formularios/components/VSO-002/vso-002.component';
import { VSO004Component } from '../formularios/components/VSO-004/vso-004.component';
import { OrganizationComponent } from '../components/organization/organization.component';
import { ListadoEstudiantesComponent } from '../components/listado-estudiantes/listado-estudiantes.component';

const routes: Routes = [
  {
    path: 'pendientes',
    component: OrganizationComponent,
    title: 'Inicio',
  },
  {
    path: 'estudiantes',
    component: ListadoEstudiantesComponent,
    title: 'Listado',
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
    redirectTo: 'pendientes'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RepresentantePracticasRoutingModule {}
