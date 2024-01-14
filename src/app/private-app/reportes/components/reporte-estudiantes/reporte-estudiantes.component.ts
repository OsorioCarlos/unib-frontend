import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Catalogo } from 'src/app/private-app/interfaces/catalogo';

import { PrivateAppService } from 'src/app/private-app/services/private-app.service';
import { AppService } from 'src/app/services/app.service';

import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-reporte-estudiantes',
  templateUrl: './reporte-estudiantes.component.html',
  styleUrls: ['./reporte-estudiantes.component.css']
})
export class ReporteEstudiantesComponent {

  formularioFiltros: FormGroup;
  apiUrl: string = environment.apiUrl;
  nivelOpciones: Catalogo[];
  carreraOpciones: Catalogo[];
  estadoOpciones: Catalogo[];

  constructor(private fb: FormBuilder, private privateAppService: PrivateAppService, private appService: AppService) {
    this.formularioFiltros = this.fb.group({
      carrera: [''],
      nivel: [''],
      estado: ['']
    });

    this.nivelOpciones = [];
    this.carreraOpciones = []
    this.estadoOpciones = [];

    this.obtenerCarreras();
    this.obtenerNiveles();
    this.obtenerEstados();
  }

  public generarReporte(): void {
    const datos = this.formularioFiltros.value;
    let filter = '';

    if (datos.carrera !== '' && datos.carrera !== null) {
      filter += `&filters[carrera_id]=${datos.carrera}`;
    }
    if (datos.nivel !== '' && datos.nivel !== null) {
      filter += `&filters[nivel_id]=${datos.nivel}`;
    }
    if (datos.estado !== '' && datos.estado !== null) {
      filter += `&filters[estado_id]=${datos.estado}`;
    }

    filter = filter.replace('&', '?');

    this.privateAppService.obtener(`reportes${filter}`).subscribe(res => {
      window.open(`${this.apiUrl}/${res.data}`, '_blank');
    }, error => {
      this.appService.alertaError('ERROR', 'Error al generar el reporte');
      console.error(error);
    });
  }

  private obtenerCarreras(): void {
    this.carreraOpciones = [];
    this.privateAppService.obtener('catalogos?nombre=CARRERAS').subscribe(res => {
      this.carreraOpciones = res.data;
    }, error => {
      this.appService.alertaError('ERROR', 'Error al obtener carreras');
      console.error(error);
    });
  }

  private obtenerNiveles(): void {
    this.nivelOpciones = [];
    this.privateAppService.obtener('catalogos?nombre=NIVELES').subscribe(res => {
      this.nivelOpciones = res.data;
    }, error => {
      this.appService.alertaError('ERROR', 'Error al obtener niveles');
      console.error(error);
    });
  }

  private obtenerEstados(): void {
    this.estadoOpciones = [];
    this.privateAppService.obtener('catalogos?nombre=ESTADOS PRACTICA PREPROFESIONAL').subscribe(res => {
      this.estadoOpciones = res.data;
    }, error => {
      this.appService.alertaError('ERROR', 'Error al obtener estados');
      console.error(error);
    });
  }

}
