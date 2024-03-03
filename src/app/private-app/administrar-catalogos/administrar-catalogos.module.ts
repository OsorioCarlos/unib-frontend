import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { SharedComponentsModule } from 'src/app/shared-components/shared-components.module';
import { AdministrarCatalogosRoutingModule } from './administrar-catalogos-routing.module';

import { FormularioCatalogoComponent } from './components/formulario-catalogo/formulario-catalogo.component';
import { VerCatalogoComponent } from './components/ver-catalogo/ver-catalogo.component';
import { ListadoCatalogoComponent } from './components/listado-catalogo/listado-catalogo.component';

import { ButtonModule } from 'primeng/button';

@NgModule({
    declarations: [
      FormularioCatalogoComponent,
      ListadoCatalogoComponent,
      VerCatalogoComponent
    ],
    imports: [
      CommonModule,
      ReactiveFormsModule,
      SharedComponentsModule,
      AdministrarCatalogosRoutingModule,
      ButtonModule
    ]
  })
  export class AdministrarCatalogosModule { }