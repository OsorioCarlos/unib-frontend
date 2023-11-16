import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/auth/servicios/auth.service';

@Component({
  selector: 'app-vso-005',
  templateUrl: './vso-005.component.html',
  styleUrls: ['./vso-005.component.css']
})
export class VSO005Component {

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
