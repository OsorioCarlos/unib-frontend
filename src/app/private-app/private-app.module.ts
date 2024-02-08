import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateAppRoutingModule } from './private-app-routing.module';
import { PrivateAppComponent } from './private-app.component';
import { StudentComponent } from './components/student/student.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AdminComponent } from './components/admin/admin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OrganizationComponent } from './components/organization/organization.component';

@NgModule({
    declarations: [
      PrivateAppComponent,
      StudentComponent,
      NavbarComponent,
      AdminComponent,
      OrganizationComponent
    ],
    imports: [
      CommonModule,
      PrivateAppRoutingModule,
      ReactiveFormsModule

    ]
  })
  export class PrivateAppModule { }
