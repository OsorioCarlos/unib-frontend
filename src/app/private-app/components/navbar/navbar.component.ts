import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private authService: AuthService, private router: Router) {}

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
