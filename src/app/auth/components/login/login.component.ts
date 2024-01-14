import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

import { Credencial } from '../../interfaces/credencial';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formularioLogin: FormGroup;

  constructor (
    private fb: FormBuilder,
    private authService: AuthService,
    private appService: AppService,
    private router: Router
  ) {
    this.formularioLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  login (): void {
    const credencial: Credencial = this.formularioLogin.value;

    this.authService.login(credencial).subscribe(data => {
      if (data.estado == 'ok') {
        this.router.navigateByUrl('/home');
      } else {
        this.appService.alertaError('Error de Autenticación', 'El correo o contraseña ingresados no son válidos');
      }
    });    
  }
}
