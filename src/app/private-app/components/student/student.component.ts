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
  collapse1: boolean = false;
  collapse2: boolean = false;
  collapse3: boolean = false;
  collapse4: boolean = false;
  collapse5: boolean = false;
  collapse6: boolean = false;
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
      evaluacionDirector: 'Pendiente',
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
          if(this.estadosProcesos.cartaCompromiso == 'Pendiente' ){         
            this.collapse1 = true;
            this.appService.alertaExito('BIENVENIDO', 'Ya puedes completar tu carta de compromiso');
          }
          if(this.estadosProcesos.cartaCompromiso == 'Completado' && this.estadosProcesos.solicitud == 'Pendiente'){
            this.collapse2 = true;
            this.appService.alertaAviso('INICIO DEL PROCESO', 'Ya puedes solicitar tus prácticas preprofesionales');
          }
          
          if(this.estadosProcesos.solicitud == 'Completado' && this.estadosProcesos.compromisoRecepcion == 'Pendiente'){
            this.collapse3 = true;
            this.appService.alertaAviso('INICIO DEL PROCESO', 'Se te enviará una notificación por correo cuando tu representante envié el compromiso de recepción.');
          }

          if(this.estadosProcesos.compromisoRecepcion == 'Completado' && this.estadosProcesos.evaluacionRepresentante == 'Pendiente'){
            this.collapse4 = true;
            this.appService.alertaAviso('PRÁCTICAS EN PROCESO', 'Se te enviará una notificación por correo cuando tu representante envíe la evaluación');
          }

          if(this.estadosProcesos.evaluacionRepresentante == 'Completado' && this.estadosProcesos.evaluacionDirector == 'Pendiente'){
            this.collapse5 = true;
            this.appService.alertaAviso('PRÁCTICAS EN PROCESO', 'Se te enviará una notificación por correo cuando tu director de carrera envíe la evaluación');
          }

          if(this.estadosProcesos.evaluacionDirector == 'Completado' && this.estadosProcesos.informeFinal == 'Pendiente'){
            this.collapse6 = true;
            this.appService.alertaAviso('PRÁCTICAS FINALIZADAS', 'Ya puedes completar tu informe final');
          }
          if (
            this.estadosProcesos.cartaCompromiso == 'Completado' &&
            this.estadosProcesos.solicitud == 'Completado' &&
            this.estadosProcesos.compromisoRecepcion == 'Completado' &&
            this.estadosProcesos.evaluacionRepresentante == 'Completado' &&
            this.estadosProcesos.evaluacionDirector == 'Completado' &&
            this.estadosProcesos.informeFinal == 'Completado'
          ) {
            this.collapse1 = true;
            this.collapse2 = true;
            this.collapse3 = true;
            this.collapse4 = true;
            this.collapse5 = true;
            this.collapse6 = true;

            this.appService.alertaExito(
              'PRÁCTICAS FINALIZADAS!',
              'Haz completado tus prácticas preprofesionales'
            );
          }
        },
        (err) => {
          this.appService.alertaAviso('INICIO DEL PROCESO', 'Bienvenido! Por favor completa la carta de compromiso para continuar con el proceso.');
          this.collapse1 = true;
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

  descargarEvaluacionOrganizacion(): void {
    const datos = {
      identificacionEstudiante: this.estudiante.cedula,
    };
    this.privateAppService.crear('formularios/generarVso004', datos).subscribe(
      (res) => {
        window.open(`${this.apiUrl}/${res.data}`, '_blank');
      },
      (error) => {
        this.appService.alertaError(
          'ERROR',
          'Error al generar evaluacion organizacion'
        );
        console.error(error);
      }
    );
  }

  descargarEvaluacionDirector(): void {
    const datos = {
      identificacionEstudiante: this.estudiante.cedula,
    };
    this.privateAppService.crear('formularios/generarVso003', datos).subscribe(
      (res) => {
        window.open(`${this.apiUrl}/${res.data}`, '_blank');
      },
      (error) => {
        this.appService.alertaError(
          'ERROR',
          'Error al generar evaluacion director'
        );
        console.error(error);
      }
    );
  }
}
