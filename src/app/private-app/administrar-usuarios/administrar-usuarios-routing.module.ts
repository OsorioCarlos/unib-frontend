import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CargaMasivaUsuarioComponent } from './components/carga-masiva-usuario/carga-masiva-usuario.component';
import { FormularioUsuarioComponent } from './components/formulario-usuario/formulario-usuario.component';
import { ListadoUsuarioComponent } from './components/listado-usuario/listado-usuario.component';
import { VerUsuarioComponent } from './components/ver-usuario/ver-usuario.component';

const routes: Routes = [
    { 
        path: '',
        children: [
            { path: 'editar/:id', component: FormularioUsuarioComponent },
            { path: 'listado', component: ListadoUsuarioComponent },
            { path: 'nuevo', component: FormularioUsuarioComponent },
            { path: 'ver/:id', component: VerUsuarioComponent },
            { path: 'carga-masiva', component: CargaMasivaUsuarioComponent }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrarUsuariosRoutingModule { }