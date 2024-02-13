import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CartaCompromisoComponent } from './components/carta-compromiso/carta-compromiso.component';
import { VSO001Component } from './components/VSO-001/vso-001.component';
import { VSO002Component } from './components/VSO-002/vso-002.component';
import { VSO003Component } from './components/VSO-003/vso-003.component';
import { VSO004Component } from './components/VSO-004/vso-004.component';
import { VSO005Component } from './components/VSO-005/vso-005.component';

const routes: Routes = [
    {
        path: '',
        children: [
            { path: 'carta-compromiso', component: CartaCompromisoComponent },
            { path: 'vso-001', component: VSO001Component },
            { path: 'vso-002/:id', component: VSO002Component },
            { path: 'vso-003', component: VSO003Component },
            { path: 'vso-004', component: VSO004Component },
            { path: 'vso-005', component: VSO005Component }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormulariosRoutingModule { }
