import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { SharedComponentsModule } from 'src/app/shared-components/shared-components.module';
import { AdministrarOrganizacionesRoutingModule } from './administrar-organizaciones-routing.module';

import { CargaMasivaOrganizacionComponent } from './components/carga-masiva-organizacion/carga-masiva-organizacion.component';
import { FormularioOrganizacionComponent } from './components/formulario-organizacion/formulario-organizacion.component';
import { ListadoOrganizacionComponent } from './components/listado-organizacion/listado-organizacion.component';
import { VerOrganizacionComponent } from './components/ver-organizacion/ver-organizacion.component';

import { ButtonModule } from 'primeng/button';

@NgModule({
    declarations: [
      CargaMasivaOrganizacionComponent,
      FormularioOrganizacionComponent,
      ListadoOrganizacionComponent,
      VerOrganizacionComponent
    ],
    imports: [
      CommonModule,
      ReactiveFormsModule,
      SharedComponentsModule,
      AdministrarOrganizacionesRoutingModule,
      ButtonModule
    ]
  })
  export class AdministrarOrganizacionesModule { }