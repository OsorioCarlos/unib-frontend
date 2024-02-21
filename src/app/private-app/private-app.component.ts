import { Component } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { AuthUser } from './interfaces/auth-user';
import { PrivateAppService } from './services/private-app.service';

@Component({
  selector: 'private-app-root',
  templateUrl: './private-app.component.html',
  styleUrls: ['./private-app.component.css']
})
export class PrivateAppComponent {
  authUser : AuthUser;
  constructor(    private privateAppService: PrivateAppService,
    ){
    this.authUser = {
      cedula: '',
      nombre: '',
      tipo_usuario: '',
    };
    this.obtenerInfoUsuario();
  }

  obtenerInfoUsuario(){
    this.privateAppService.obtener('auth/authUser').subscribe(
      (res) => {
        this.authUser = res.data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
