import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { Pagination } from 'src/app/private-app/interfaces/pagination';
import { Usuario } from 'src/app/private-app/interfaces/usuario';

import { PrivateAppService } from 'src/app/private-app/services/private-app.service';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-listado-usuario',
  templateUrl: './listado-usuario.component.html',
  styleUrls: ['./listado-usuario.component.css']
})
export class ListadoUsuarioComponent {

  public usuarios: Usuario[];
  public total_pages: number;
  public current_page: number;

  constructor(private router: Router, private privateAppService: PrivateAppService, private appService: AppService) {
    this.usuarios = [];
    this.total_pages =  0;
    this.current_page =  0;
  }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  public cambiarPagina(pagina: number): void {
    this.obtenerUsuarios(pagina);
  }

  public redireccionar(ruta: string): void {
    this.router.navigateByUrl(`/app/administrar-usuarios/${ruta}`)
  }

  public abrirVentanaConfirmacion(usuario_id: number): void {
    this.appService.alertaConfirmacion('ELIMINAR USUARIO', '¿Seguro que desea eliminar este registro?').then(res => {
      if (res.isConfirmed) {
        this.privateAppService.eliminar('usuarios', usuario_id).subscribe(res => {
          this.obtenerUsuarios();
        }, err => {
          this.appService.alertaError('ERROR', 'Error al eliminar el usuario');
          console.error(err);
        });
      }
    });
  }

  private obtenerUsuarios(pagina=1): void {
    this.privateAppService.obtener(`usuarios?page=${pagina}`).subscribe(res => {
      const dataPagination: Pagination = res.data;
      this.total_pages = dataPagination.last_page;
      this.current_page = dataPagination.current_page;
      const dataUsuarios: Usuario[] = dataPagination.data;
      this.usuarios = dataUsuarios;
    }, err => {
      this.appService.alertaError('ERROR', 'Error al obtener los usuarios');
      console.error(err);
    });
  }

}
