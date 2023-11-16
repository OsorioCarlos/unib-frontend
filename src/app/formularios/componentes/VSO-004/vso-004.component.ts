import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/auth/servicios/auth.service';

@Component({
  selector: 'app-vso-004',
  templateUrl: './vso-004.component.html',
  styleUrls: ['./vso-004.component.css']
})
export class VSO004Component {

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
