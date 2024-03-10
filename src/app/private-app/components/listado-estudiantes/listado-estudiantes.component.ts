import { Component } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { PrivateAppService } from '../../services/private-app.service';
import { environment } from 'src/environment/environment';
import { PracticaPreProfesional } from '../../interfaces/practica-preprofesional';

@Component({
  selector: 'app-listado-estudiantes',
  templateUrl: './listado-estudiantes.component.html',
  styleUrls: ['./listado-estudiantes.component.css'],
})
export class ListadoEstudiantesComponent {
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
