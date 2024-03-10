import { Component } from '@angular/core';
import { AppService } from 'src/app/services/app.service';

import { environment } from 'src/environment/environment';

import { PrivateAppService } from 'src/app/private-app/services/private-app.service';
import { PracticaPreProfesional } from 'src/app/private-app/interfaces/practica-preprofesional';

@Component({
  selector: 'app-practicas-estudiante',
  templateUrl: './practicas-estudiante.component.html',
  styleUrls: ['./practicas-estudiante.component.css'],
})
export class PracticasEstudianteComponent {
  apiUrl: string = environment.apiUrl;
  practicasPreprofesionales: PracticaPreProfesional[]

  constructor(
    private privateAppService: PrivateAppService,
    private appService: AppService
  ) {
    this.practicasPreprofesionales = [];
  }

  ngOnInit(): void {
    this.obtenerPracticasPreprofesionales();
  }

  public obtenerPracticasPreprofesionales(): void {
    this.privateAppService.obtener('practicas_preprofesionales').subscribe({
      next: res => {
        const practicasPreprofesionalesData: PracticaPreProfesional[] = res.data;
        this.practicasPreprofesionales = practicasPreprofesionalesData;
      },
      error: err => {
        this.appService.alertaError('ERROR', 'Error al obtener las prácticas preprofesionales');
        console.error(err);
      }
    });
  }
}
