import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { SharedComponentsModule } from '../shared-components/shared-components.module';

import { NavbarComponent } from './components/navbar/navbar.component';
import { OrganizationComponent } from './components/organization/organization.component';
import { StudentComponent } from './components/student/student.component';
import { PrivateAppRoutingModule } from './private-app-routing.module';
import { PrivateAppComponent } from './private-app.component';
import { DirectorComponent } from './components/director/director.component';
import { SeguimientoEvaluacionComponent } from './components/director/seguimiento-evaluacion/seguimiento-evaluacion.component';
import { ResumenPracticaComponent } from './components/student/resumen-practica/resumen-practica.component';
import {TableModule} from 'primeng/table';
import { FormsModule } from '@angular/forms';

import { ListadoEstudiantesComponent } from './components/listado-estudiantes/listado-estudiantes.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    PrivateAppComponent,
    StudentComponent,
    NavbarComponent,
    HomeComponent,
    OrganizationComponent,
    DirectorComponent,
    SeguimientoEvaluacionComponent,
    ResumenPracticaComponent,
    ListadoEstudiantesComponent
  ],
  imports: [
    CommonModule,
    PrivateAppRoutingModule,
    ReactiveFormsModule,
    TableModule,
    FormsModule,
    SharedComponentsModule
  ]
})
export class PrivateAppModule {}
