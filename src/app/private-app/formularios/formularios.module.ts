import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { FormulariosRoutingModule } from './formularios-routing.module';

import { VSO001Component } from './components/VSO-001/vso-001.component';
import { VSO002Component } from './components/VSO-002/vso-002.component';
import { VSO003Component } from './components/VSO-003/vso-003.component';
import { VSO004Component } from './components/VSO-004/vso-004.component';
import { VSO005Component } from './components/VSO-005/vso-005.component';
import { CartaCompromisoComponent } from './components/carta-compromiso/carta-compromiso.component';

@NgModule({
  declarations: [
    CartaCompromisoComponent,
    VSO001Component,
    VSO002Component,
    VSO003Component,
    VSO004Component,
    VSO005Component,
  ],
  imports: [CommonModule, FormulariosRoutingModule, ReactiveFormsModule],
})
export class FormulariosModule {}
