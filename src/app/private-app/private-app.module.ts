import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateAppRoutingModule } from './private-app-routing.module';
import { PrivateAppComponent } from './private-app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
    declarations: [
      PrivateAppComponent,
      HomeComponent,
      NavbarComponent
    ],
    imports: [
      CommonModule,
      PrivateAppRoutingModule
    ]
  })
  export class PrivateAppModule { }