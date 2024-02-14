import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReporteEstudiantesComponent } from './components/reporte-estudiantes/reporte-estudiantes.component';

const routes: Routes = [
  {
    path: '',
    children: [{ path: 'estudiantes', component: ReporteEstudiantesComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportesRoutingModule {}
