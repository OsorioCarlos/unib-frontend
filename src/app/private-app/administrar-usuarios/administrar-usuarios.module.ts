import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrarUsuariosRoutingModule } from './administrar-usuarios-routing.module';

import { FormularioUsuarioComponent } from './components/formulario-usuario/formulario-usuario.component';
import { ListadoUsuarioComponent } from './components/listado-usuario/listado-usuario.component';
import { VerUsuarioComponent } from './components/ver-usuario/ver-usuario.component';
import { PaginationComponent } from '../components/pagination/pagination.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
      FormularioUsuarioComponent,
      ListadoUsuarioComponent,
      VerUsuarioComponent,
      PaginationComponent
    ],
    imports: [
      CommonModule,
      AdministrarUsuariosRoutingModule,
      ReactiveFormsModule
    ]
  })
  export class AdministrarUsuariosModule { }