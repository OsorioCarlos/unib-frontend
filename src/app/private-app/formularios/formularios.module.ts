import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FormulariosRoutingModule } from './formularios-routing.module';

import { VSO001Component } from './componentes/VSO-001/vso-001.component';
import { VSO002Component } from './componentes/VSO-002/vso-002.component';
import { VSO004Component } from './componentes/VSO-004/vso-004.component';
import { VSO003Component } from './componentes/VSO-003/vso-003.component';
import { VSO005Component } from './componentes/VSO-005/vso-005.component';

@NgModule({
    declarations: [
      VSO001Component,
      VSO002Component,
      VSO003Component,
      VSO004Component,
      VSO005Component,
    ],
    imports: [
      CommonModule,
      FormulariosRoutingModule,
      ReactiveFormsModule
    ]
  })
  export class FormulariosModule { }