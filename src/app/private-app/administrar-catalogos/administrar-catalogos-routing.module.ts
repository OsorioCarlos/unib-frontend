import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormularioCatalogoComponent } from './components/formulario-catalogo/formulario-catalogo.component';
import { VerCatalogoComponent } from './components/ver-catalogo/ver-catalogo.component';
import { ListadoCatalogoComponent } from './components/listado-catalogo/listado-catalogo.component';

const routes: Routes = [
    { 
        path: '',
        children: [
            { path: 'editar/:id', component: FormularioCatalogoComponent },
            { path: 'listado', component: ListadoCatalogoComponent },
            { path: 'nuevo', component: FormularioCatalogoComponent },
            { path: 'ver/:id', component: VerCatalogoComponent },
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrarCatalogosRoutingModule { }