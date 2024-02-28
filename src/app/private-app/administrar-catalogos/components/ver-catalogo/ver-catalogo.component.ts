import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Catalogo } from 'src/app/private-app/interfaces/catalogo';
import { Pagination } from 'src/app/private-app/interfaces/pagination';

import { Recurso } from 'src/app/private-app/interfaces/recurso';

import { PrivateAppService } from 'src/app/private-app/services/private-app.service';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-ver-catalogo',
  templateUrl: './ver-catalogo.component.html',
  styleUrls: ['./ver-catalogo.component.css']
})
export class VerCatalogoComponent {

  public recurso: Recurso | null;
  public catalogos: Catalogo[];
  public total_pages: number;
  public current_page: number;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private privateAppService: PrivateAppService,
    private appService: AppService
  ) {
    this.recurso = null;
    this.catalogos = [];
    this.total_pages =  0;
    this.current_page =  0;
  }

  ngOnInit(): void {
    this.obtenerRecurso();
  }

  public cambiarPagina(pagina: number): void {
    if (this.recurso !== null) {
      this.obtenerCatalogos(this.recurso.id, pagina);
    }
  }

  public restringirEliminadoRegistro(): boolean {
    const listadoExcluir = [1, 2, 4];
    let resultado = false;
    if (this.recurso !== null && listadoExcluir.includes(this.recurso.id)) {
      resultado = true;
    }
    return resultado;
  }

  public restringirModificacionRegistro(): boolean {
    const listadoExcluir = [1, 2, 4];
    let resultado = false;
    if (this.recurso !== null && listadoExcluir.includes(this.recurso.id)) {
      resultado = true;
    }
    return resultado;
  }

  public restringirCreacionRegistro(): boolean {
    const listadoExcluir = [1, 2, 4];
    let resultado = false;
    if (this.recurso !== null && listadoExcluir.includes(this.recurso.id)) {
      resultado = true;
    }
    return resultado;
  }


  public redireccionar(ruta: string): void {
    this.router.navigateByUrl(`/app/administrar-catalogos/${ruta}`)
  }

  public abrirVentanaConfirmacion(catalogo_id: number): void {
    this.appService.alertaConfirmacion('ELIMINAR CATALOGO', '¿Seguro que desea eliminar este registro?').then(res => {
      if (res.isConfirmed) {
        this.privateAppService.eliminar('catalogos', catalogo_id).subscribe(res => {
          this.obtenerRecurso();
        }, err => {
          this.appService.alertaError('ERROR', 'Error al eliminar el catalogo');
          console.error(err);
        });
      }
    });
  }

  private obtenerRecurso(): void {
    let id = '';
    this.activatedRoute.params.subscribe((params: Params) => {
      id = params['id'];
    });
    this.privateAppService.obtener(`recursos/${id}`).subscribe(res => {
      const data: Recurso = res.data;
      this.recurso = data;
      this.obtenerCatalogos(this.recurso.id);
    }, err => {
      this.appService.alertaError('ERROR', 'Error al obtener el recurso');
      console.error(err);
    });
  }

  private obtenerCatalogos(recurso_id: number, pagina=1): void {
    this.privateAppService.obtener(`catalogos?pagination=true&recurso_id=${recurso_id}`).subscribe(res => {
      const dataPagination: Pagination = res.data;
      this.total_pages = dataPagination.last_page;
      this.current_page = dataPagination.current_page;
      const dataCatalogos: Catalogo[] = dataPagination.data;
      this.catalogos = dataCatalogos;
    }, err => {
      this.appService.alertaError('ERROR', 'Error al obtener los catálogos');
      console.error(err);
    });
  }

}
