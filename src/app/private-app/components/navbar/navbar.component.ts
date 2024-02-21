import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AuthUser } from '../../interfaces/auth-user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  @Input() authUser: AuthUser; 
  constructor(private authService: AuthService, private router: Router) {
    this.authUser = {
      cedula: '',
      nombre: '',
      tipo_usuario: '',
    };
  }

  public logout(): void {
    this.authService.logout().subscribe((data) => {
      if (data.estado == 'ok') {
        this.router.navigateByUrl('/auth');
      } else {
        console.error('Error');
      }
    });
  }
}
