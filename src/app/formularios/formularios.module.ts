import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FormulariosRoutingModule } from './formularios-routing.module';

import { VSO004Component } from './componentes/VSO-004/vso-004.component';
import { VSO003Component } from './componentes/VSO-003/vso-003.component';
import { VSO005Component } from './componentes/VSO-005/vso-005.component';

@NgModule({
    declarations: [
      VSO003Component,
      VSO004Component,
      VSO005Component
    ],
    imports: [
      CommonModule,
      FormulariosRoutingModule,
      ReactiveFormsModule
    ]
  })
  export class FormulariosModule { }