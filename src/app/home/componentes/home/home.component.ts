import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/auth/servicios/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  logout (): void {
    this.authService.logout().subscribe(data =>{
      if (data.estado == 'ok') {
        alert('Adios!');
        this.router.navigateByUrl('/auth');
      } else {
        alert('Error');
      }
    });
  }
}
