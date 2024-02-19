import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './components/admin/admin.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { OrganizationComponent } from './components/organization/organization.component';
import { StudentComponent } from './components/student/student.component';
import { PrivateAppRoutingModule } from './private-app-routing.module';
import { PrivateAppComponent } from './private-app.component';
import { DirectorComponent } from './components/director/director.component';

@NgModule({
  declarations: [
    PrivateAppComponent,
    StudentComponent,
    NavbarComponent,
    AdminComponent,
    OrganizationComponent,
    DirectorComponent,
  ],
  imports: [CommonModule, PrivateAppRoutingModule, ReactiveFormsModule],
})
export class PrivateAppModule {}
