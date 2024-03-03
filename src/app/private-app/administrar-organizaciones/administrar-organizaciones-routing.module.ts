import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CargaMasivaOrganizacionComponent } from './components/carga-masiva-organizacion/carga-masiva-organizacion.component';
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
            { path: 'carga-masiva', component: CargaMasivaOrganizacionComponent }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrarOrganizacionesRoutingModule { }