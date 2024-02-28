import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { Pagination } from 'src/app/private-app/interfaces/pagination';
import { Recurso } from 'src/app/private-app/interfaces/recurso';

import { PrivateAppService } from 'src/app/private-app/services/private-app.service';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-listado-catalogo',
  templateUrl: './listado-catalogo.component.html',
  styleUrls: ['./listado-catalogo.component.css']
})
export class ListadoCatalogoComponent {

  public recursos: Recurso[];
  public total_pages: number;
  public current_page: number;

  constructor(private router: Router, private privateAppService: PrivateAppService, private appService: AppService) {
    this.recursos = [];
    this.total_pages =  0;
    this.current_page =  0;
  }

  ngOnInit(): void {
    this.obtenerRecursos();
  }

  public cambiarPagina(pagina: number): void {
    this.obtenerRecursos(pagina);
  }

  public redireccionar(ruta: string): void {
    this.router.navigateByUrl(`/app/administrar-catalogos/${ruta}`)
  }

  public abrirVentanaConfirmacion(recurso_id: number): void {
    this.appService.alertaConfirmacion('ELIMINAR RECURSO Y CATÁLOGOS', '¿Seguro que desea eliminar este registro?').then(res => {
      if (res.isConfirmed) {
        this.privateAppService.eliminar('recursos', recurso_id).subscribe(() => {
          this.obtenerRecursos();
        }, err => {
          this.appService.alertaError('ERROR', 'Error al eliminar el recurso');
          console.error(err);
        });
      }
    });
  }

  public restringirEliminadoRegistro(recurso_id: number): boolean {
    const listadoExcluir = [1, 2, 3, 4, 5, 6];
    let resultado = false;
    if (listadoExcluir.includes(recurso_id)) {
      resultado = true;
    }
    return resultado;
  }

  public restringirModificacionRegistro(recurso_id: number): boolean {
    const listadoExcluir = [1, 2, 3, 4, 5, 6];
    let resultado = false;
    if (listadoExcluir.includes(recurso_id)) {
      resultado = true;
    }
    return resultado;
  }

  private obtenerRecursos(pagina=1): void {
    this.privateAppService.obtener(`recursos?page=${pagina}`).subscribe(res => {
      const dataPagination: Pagination = res.data;
      this.total_pages = dataPagination.last_page;
      this.current_page = dataPagination.current_page;
      const dataRecursos: Recurso[] = dataPagination.data;
      this.recursos = dataRecursos;
    }, err => {
      this.appService.alertaError('ERROR', 'Error al obtener los recursos');
      console.error(err);
    });
  }

}
