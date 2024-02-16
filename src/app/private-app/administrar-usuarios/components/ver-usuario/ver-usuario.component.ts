import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Usuario } from 'src/app/private-app/interfaces/usuario';

import { PrivateAppService } from 'src/app/private-app/services/private-app.service';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-ver-usuario',
  templateUrl: './ver-usuario.component.html',
  styleUrls: ['./ver-usuario.component.css']
})
export class VerUsuarioComponent {

  public usuario: Usuario | null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private privateAppService: PrivateAppService,
    private appService: AppService
  ) {
    this.usuario = null;
  }

  ngOnInit(): void {
    this.obtenerUsuario();
  }

  private obtenerUsuario(): void {
    let id = '';
    this.activatedRoute.params.subscribe((params: Params) => {
      id = params['id'];
    });
    this.privateAppService.obtener(`usuarios/${id}`).subscribe(res => {
      const data: Usuario = res.data;
      this.usuario = data;
    }, err => {
      this.appService.alertaError('ERROR', 'Error al obtener los usuarios');
      console.error(err);
    });
  }

}
