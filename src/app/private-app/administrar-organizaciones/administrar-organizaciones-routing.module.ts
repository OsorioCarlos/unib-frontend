import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormularioOrganizacionComponent } from './components/formulario-organizacion/formulario-organizacion.component';
import { ListadoOrganizacionComponent } from './components/listado-organizacion/listado-organizacion.component';
import { VerOrganizacionComponent } from './components/ver-organizacion/ver-organizacion.component';

const routes: Routes = [
    { 
        path: '',
        children: [
            { path: 'editar/:id', component: FormularioOrganizacionComponent },
            { path: 'listado', component: ListadoOrganizacionComponent },
            { path: 'nuevo', component: FormularioOrganizacionComponent },
            { path: 'ver/:id', component: VerOrganizacionComponent },
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrarOrganizacionesRoutingModule { }