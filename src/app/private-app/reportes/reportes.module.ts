import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ReportesRoutingModule } from './reportes-routing.module';

import { ReporteEstudiantesComponent } from './components/reporte-estudiantes/reporte-estudiantes.component';

@NgModule({
  declarations: [ReporteEstudiantesComponent],
  imports: [CommonModule, ReportesRoutingModule, ReactiveFormsModule],
})
export class ReportesModule {}
