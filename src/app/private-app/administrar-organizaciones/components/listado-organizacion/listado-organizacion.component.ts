import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { Pagination } from 'src/app/private-app/interfaces/pagination';
import { Organizacion } from 'src/app/private-app/interfaces/organizacion';

import { PrivateAppService } from 'src/app/private-app/services/private-app.service';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-listado-organizacion',
  templateUrl: './listado-organizacion.component.html',
  styleUrls: ['./listado-organizacion.component.css']
})
export class ListadoOrganizacionComponent {

  public organizaciones: Organizacion[];
  public total_pages: number;
  public current_page: number;

  constructor(private router: Router, private privateAppService: PrivateAppService, private appService: AppService) {
    this.organizaciones = [];
    this.total_pages =  0;
    this.current_page =  0;
  }

  ngOnInit(): void {
    this.obtenerOrganizaciones();
  }

  public cambiarPagina(pagina: number): void {
    this.obtenerOrganizaciones(pagina);
  }

  public redireccionar(ruta: string): void {
    this.router.navigateByUrl(`/app/administrar-organizaciones/${ruta}`)
  }

  public abrirVentanaConfirmacion(organizacion_id: number): void {
    this.appService.alertaConfirmacion('ELIMINAR ORGANIZACIÓN', '¿Seguro que desea eliminar este registro?').then(res => {
      if (res.isConfirmed) {
        this.privateAppService.eliminar('organizaciones', organizacion_id).subscribe({
          next: () => {
            this.obtenerOrganizaciones();
          },
          error: err => {
            this.appService.alertaError('ERROR', 'Error al eliminar la organización');
            console.error(err);
          }
        });
      }
    });
  }

  private obtenerOrganizaciones(pagina=1): void {
    this.privateAppService.obtener(`organizaciones?page=${pagina}`).subscribe({
      next: res => {
        const dataPagination: Pagination = res.data;
        this.total_pages = dataPagination.last_page;
        this.current_page = dataPagination.current_page;
        const dataOrganizaciones: Organizacion[] = dataPagination.data;
        this.organizaciones = dataOrganizaciones;
      },
      error: err => {
        this.appService.alertaError('ERROR', 'Error al obtener las organizaciones');
        console.error(err);
      }
    });
  }

}
