import { NgModule } from '@angular/core';
import { RouterModule, Routes, mapToCanActivate } from '@angular/router';

import { StudentComponent } from './components/student/student.component';
import { AdminComponent } from './components/admin/admin.component';
import { AuthGuard } from '../guards/auth.guard';
import { OrganizationComponent } from './components/organization/organization.component';



const routes: Routes = [
    {
        path: 'student',
        component: StudentComponent,
        canActivate:[AuthGuard],
        canLoad:[AuthGuard],
        data: { expectedRoles: 'ESTUDIANTE' }
    },
    {
        path: 'formularios',
        loadChildren: () => import('./formularios/formularios.module').then(m => m.FormulariosModule)
    },
    {
        path: 'reportes',
        loadChildren: () => import('./reportes/reportes.module').then(m => m.ReportesModule)
      },
      {
        path: 'admin',
        component: AdminComponent,
        canActivate:[AuthGuard],
        canLoad:[AuthGuard],
        data: { expectedRoles: 'ADMINISTRADOR' }
      },
      {
        path: 'organization',
        component: OrganizationComponent,
        canActivate:[AuthGuard],
        canLoad:[AuthGuard],
        data: { expectedRoles: 'REPRESENTANTE PRÁCTICAS' }
      },
    {
        path: '**',
        redirectTo: 'home'
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateAppRoutingModule { }
