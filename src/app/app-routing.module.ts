import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { PrivateAppComponent } from './private-app/private-app.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'app',
    component: PrivateAppComponent,
    loadChildren: () => import('./private-app/private-app.module').then(m => m.PrivateAppModule),
    canActivate: [ AuthGuard ],
    canLoad: [ AuthGuard ]
  },
  {
    path: '**',
    redirectTo: 'app'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
