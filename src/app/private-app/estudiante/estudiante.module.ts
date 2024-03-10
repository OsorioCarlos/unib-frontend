import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { EstudianteRoutingModule } from './estudiante-routing.module';
import { PracticasEstudianteComponent } from './components/practicas-estudiante/practicas-estudiante.component';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [
    PracticasEstudianteComponent
  ],
  imports: [
    CommonModule,
    EstudianteRoutingModule,
    ReactiveFormsModule,
    TableModule
  ]
})
export class EstudianteModule {}
