import { AfterViewInit, Component } from '@angular/core';
import { PrivateAppService } from '../../services/private-app.service';
import { PracticaPreProfesional } from '../../interfaces/practica-preprofesional';
import { AppService } from 'src/app/services/app.service';
import { Catalogo } from '../../interfaces/catalogo';
import { Organizacion } from '../../interfaces/organizacion';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstadosProcesos } from '../../interfaces/estados-procesos';
// declare var bootstrap: any; // Declarar bootstrap para evitar errores de TypeScript

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
})
export class StudentComponent{
  estadosProcesos: EstadosProcesos;
  constructor(private privateAppService: PrivateAppService, private appService: AppService, private fb: FormBuilder) {
    this.estadosProcesos = {
      cartaCompromiso: 'Pendiente',
      solicitud: 'Pendiente',
      informeFinal: 'Pendiente'
    };
    this.consultarStatusProcesos();

  }
  // ngAfterViewInit() {
  //   this.abrirModal();
  // }

  // abrirModal() {
  //   const miModal = new bootstrap.Modal(document.getElementById('modalCartaCompromiso'));
  //   miModal.show();
  // }

  consultarStatusProcesos(){
    this.privateAppService.obtener('estudiantes/obtenerEstadosPracticasPreprofesionales').subscribe(res => {
      this.estadosProcesos = res.data;
      if(this.estadosProcesos.cartaCompromiso == 'Completado' && this.estadosProcesos.informeFinal == 'Completado' && this.estadosProcesos.solicitud == 'Completado'){
        this.appService.alertaExito('Felicidades!', 'Haz completado tus prácticas preprofesionales');

      }
    }, err => {
      this.appService.alertaInformacion('Recuerda!', err.error.mensaje);
    });
  }
}
