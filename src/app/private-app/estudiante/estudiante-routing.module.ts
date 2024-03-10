import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StudentComponent } from '../components/student/student.component';
import { CartaCompromisoComponent } from '../formularios/components/carta-compromiso/carta-compromiso.component';
import { VSO001Component } from '../formularios/components/VSO-001/vso-001.component';
import { VSO005Component } from '../formularios/components/VSO-005/vso-005.component';
import { ResumenPracticaComponent } from '../components/student/resumen-practica/resumen-practica.component';
import { PracticasEstudianteComponent } from './components/practicas-estudiante/practicas-estudiante.component';

const routes: Routes = [
  {
    path: 'pendientes',
    component: StudentComponent,
    title: 'Inicio',
  },
  {
    path: 'practicas',
    component: PracticasEstudianteComponent,
    title: 'Practicas',
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
    path: 'resumen-practica/:id',
    component: ResumenPracticaComponent,
    title: 'Resumen',
  },
  {
    path: '**',
    redirectTo: 'pendientes'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstudianteRoutingModule {}
