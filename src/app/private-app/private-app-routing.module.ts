import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
    { 
        path: 'home',
        component: HomeComponent
    },
    { 
        path: 'formularios',
        loadChildren: () => import('./formularios/formularios.module').then(m => m.FormulariosModule)
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateAppRoutingModule { }