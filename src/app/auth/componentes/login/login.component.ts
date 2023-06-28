import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../servicios/auth.service';

import { Credencial } from '../../interfaces/credencial';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formularioLogin: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  constructor (
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  login (): void {
    const credencial: Credencial = this.formularioLogin.value;

    this.authService.login(credencial).subscribe(data => {
      if (data.estado == 'ok') {
        alert('Credenciales correctas');
        this.router.navigateByUrl('/home');
      } else {
        alert(data.mensaje);
      }
    });    
  }
}
