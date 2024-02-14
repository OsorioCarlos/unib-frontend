import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environment/environment';
import { AuthUser } from '../../interfaces/auth-user';
import { EstadosProcesos } from '../../interfaces/estados-procesos';
import { PrivateAppService } from '../../services/private-app.service';

// declare var bootstrap: any; // Declarar bootstrap para evitar errores de TypeScript

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
})
export class StudentComponent {
  apiUrl: string = environment.apiUrl;
  estadosProcesos: EstadosProcesos;
  estudiante: AuthUser;
  constructor(
    private privateAppService: PrivateAppService,
    private appService: AppService,
    private fb: FormBuilder
  ) {
    this.estadosProcesos = {
      cartaCompromiso: 'Pendiente',
      solicitud: 'Pendiente',
      informeFinal: 'Pendiente',
      compromisoRecepcion: 'Pendiente',
      evaluacionRepresentante: 'Pendiente',
    };
    this.estudiante = {
      cedula: '',
      nombre: '',
      tipo_usuario: '',
    };
    this.consultarStatusProcesos();
    this.mostrarBienvenida();
  }
  // ngAfterViewInit() {
  //   this.abrirModal();
  // }

  // abrirModal() {
  //   const miModal = new bootstrap.Modal(document.getElementById('modalCartaCompromiso'));
  //   miModal.show();
  // }

  consultarStatusProcesos() {
    this.privateAppService
      .obtener('estudiantes/obtenerEstadosPracticasPreprofesionales')
      .subscribe(
        (res) => {
          this.estadosProcesos = res.data;
          if (
            this.estadosProcesos.cartaCompromiso == 'Completado' &&
            this.estadosProcesos.informeFinal == 'Completado' &&
            this.estadosProcesos.solicitud == 'Completado'
          ) {
            this.appService.alertaExito(
              'Felicidades!',
              'Haz completado tus prácticas preprofesionales'
            );
          }
        },
        (err) => {
          this.appService.alertaInformacion('Recuerda!', err.error.mensaje);
        }
      );
  }

  mostrarBienvenida() {
    this.privateAppService.obtener('auth/authUser').subscribe(
      (res) => {
        this.estudiante = res.data;
      },
      (err) => {}
    );
  }

  public descargarCartaCompromiso(): void {
    const datos = {
      identificacionEstudiante: this.estudiante.cedula,
    };
    this.privateAppService
      .crear('formularios/generar_carta_compromiso', datos)
      .subscribe(
        (res) => {
          window.open(`${this.apiUrl}/${res.data}`, '_blank');
        },
        (error) => {
          this.appService.alertaError(
            'ERROR',
            'Error al generar la carta de compromiso'
          );
          console.error(error);
        }
      );
  }

  public descargarSolicitudEstudiante(): void {
    const datos = {
      identificacionEstudiante: this.estudiante.cedula,
    };
    this.privateAppService.crear('formularios/generarVso001', datos).subscribe(
      (res) => {
        window.open(`${this.apiUrl}/${res.data}`, '_blank');
      },
      (error) => {
        this.appService.alertaError(
          'ERROR',
          'Error al generar solicitud de prácticas preprofesionales'
        );
        console.error(error);
      }
    );
  }

  descargarCompromisoRecepcion(): void {
    const datos = {
      identificacionEstudiante: this.estudiante.cedula,
    };
    this.privateAppService.crear('formularios/generarVso002', datos).subscribe(
      (res) => {
        window.open(`${this.apiUrl}/${res.data}`, '_blank');
      },
      (error) => {
        this.appService.alertaError(
          'ERROR',
          'Error al generar compromiso de recepcion'
        );
        console.error(error);
      }
    );
  }
  descargarInformeFinal(): void {
    const datos = {
      identificacionEstudiante: this.estudiante.cedula,
    };
    this.privateAppService.crear('formularios/generarVso005', datos).subscribe(
      (res) => {
        window.open(`${this.apiUrl}/${res.data}`, '_blank');
      },
      (error) => {
        this.appService.alertaError('ERROR', 'Error al generar informe final');
        console.error(error);
      }
    );
  }
}
