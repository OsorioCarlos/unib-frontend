import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Organizacion } from 'src/app/private-app/interfaces/organizacion';

import { PrivateAppService } from 'src/app/private-app/services/private-app.service';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-ver-organizacion',
  templateUrl: './ver-organizacion.component.html',
  styleUrls: ['./ver-organizacion.component.css']
})
export class VerOrganizacionComponent {

  public organizacion: Organizacion | null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private privateAppService: PrivateAppService,
    private appService: AppService
  ) {
    this.organizacion = null;
  }

  ngOnInit(): void {
    this.obtenerOrganizacion();
  }

  private obtenerOrganizacion(): void {
    let id = '';
    this.activatedRoute.params.subscribe((params: Params) => {
      id = params['id'];
    });
    this.privateAppService.obtener(`organizaciones/${id}`).subscribe({
      next: res => {
        const data: Organizacion = res.data;
        this.organizacion = data;
      },
      error: err => {
        this.appService.alertaError('ERROR', 'Error al obtener la organización');
        console.error(err);
      }
    });
  }

}
