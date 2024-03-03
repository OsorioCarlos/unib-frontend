import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { SharedComponentsModule } from 'src/app/shared-components/shared-components.module';
import { AdministrarUsuariosRoutingModule } from './administrar-usuarios-routing.module';

import { CargaMasivaUsuarioComponent } from './components/carga-masiva-usuario/carga-masiva-usuario.component';
import { FormularioUsuarioComponent } from './components/formulario-usuario/formulario-usuario.component';
import { ListadoUsuarioComponent } from './components/listado-usuario/listado-usuario.component';
import { VerUsuarioComponent } from './components/ver-usuario/ver-usuario.component';

import { ButtonModule } from 'primeng/button';

@NgModule({
    declarations: [
      CargaMasivaUsuarioComponent,
      FormularioUsuarioComponent,
      ListadoUsuarioComponent,
      VerUsuarioComponent
    ],
    imports: [
      CommonModule,
      ReactiveFormsModule,
      SharedComponentsModule,
      AdministrarUsuariosRoutingModule,
      ButtonModule
    ]
  })
  export class AdministrarUsuariosModule { }