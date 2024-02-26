import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { AuthUser } from '../../interfaces/auth-user';
import { User } from '../../interfaces/user';
import { PrivateAppService } from '../../services/private-app.service';
import { EstudiantesDirector } from '../../interfaces/estudiantes-director';
import { environment } from 'src/environment/environment';
import { EstadosProcesos } from '../../interfaces/estados-procesos';

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.css'],
})
export class DirectorComponent {
  apiUrl: string = environment.apiUrl;
  formGroupInformacionRepresentante!: FormGroup;
  representante: AuthUser;
  estudiantes: User[] = [];
  estudiantesDirector: EstudiantesDirector[] = [];
  evaluacionesPendientes: User[] = [];
  loading: boolean = true;
  estadosProcesos!: EstadosProcesos;

  constructor(
    private privateAppService: PrivateAppService,
    private appService: AppService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.representante = {
      cedula: '',
      nombre: '',
      tipo_usuario: '',
    };
    this.buildformGroupSolicitudPracticas();
    this.mostrarBienvenida();
    this.consultarEvaluacionesPendientes();
    this.consultarEvaluacionesPendientes();
    this.obtenerEstudiantes();
  }
  mostrarBienvenida() {
    this.privateAppService.obtener('auth/authUser').subscribe(
      (res) => {
        this.representante = res.data;
      },
      (err) => {}
    );
  }
  private buildformGroupSolicitudPracticas(): void {
    this.formGroupInformacionRepresentante = this.fb.group({
      representante: this.fb.group({
        funcionRepresentante: ['', Validators.required],
        telefono: ['', Validators.required],
      }),
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.formGroupInformacionRepresentante.valid) {
      const datos = this.formGroupInformacionRepresentante.value;

      this.privateAppService
        .crear('representante/completarInformacionBasica', datos)
        .subscribe(
          (res) => {
            this.router.navigateByUrl('/app/organization');
          },
          (err) => {
            console.log(err);
            this.appService.alertaError('ERROR', err.error.mensaje);
          }
        );
    }
  }

  consultarStatusProcesos(id: string): void {
    this.privateAppService
      .obtener('estudiantes/obtenerEstadosPracticasPreprofesionalesEstudiantes')
      .subscribe(
        (res) => {
          this.estadosProcesos = res.data;

          if (
            this.estadosProcesos.cartaCompromiso == 'Completado' &&
            this.estadosProcesos.solicitud == 'Pendiente'
          ) {
            this.descargarCartaCompromiso(id);
          }

          if (
            this.estadosProcesos.solicitud == 'Completado' &&
            this.estadosProcesos.compromisoRecepcion == 'Pendiente'
          ) {
            this.descargarSolicitudEstudiante(id);
          }

          if (
            this.estadosProcesos.compromisoRecepcion == 'Completado' &&
            this.estadosProcesos.evaluacionRepresentante == 'Pendiente'
          ) {
           this.descargarCompromisoRecepcion(id);
          }

          if (
            this.estadosProcesos.evaluacionRepresentante == 'Completado' &&
            this.estadosProcesos.evaluacionDirector == 'Pendiente'
          ) {
            this.descargarEvaluacionOrganizacion(id);
          }

          if (
            this.estadosProcesos.evaluacionDirector == 'Completado' &&
            this.estadosProcesos.informeFinal == 'Pendiente'
          ) {
            this.descargarEvaluacionDirector(id);
          }
          if (
            this.estadosProcesos.cartaCompromiso == 'Completado' &&
            this.estadosProcesos.solicitud == 'Completado' &&
            this.estadosProcesos.compromisoRecepcion == 'Completado' &&
            this.estadosProcesos.evaluacionRepresentante == 'Completado' &&
            this.estadosProcesos.evaluacionDirector == 'Completado' &&
            this.estadosProcesos.informeFinal == 'Completado'
          ) {
            this.descargarInformeFinal(id);
          }
        },
        (err) => {

        }
      );
  }
  consultarEvaluacionesPendientes(): void {
    this.privateAppService
      .obtener('director/obtenerEvaluacionesPendientes')
      .subscribe(
        (res) => {
          this.estudiantes = res.data;
        },
        (err) => {
          console.log(err);
        }
      );
  }
  obtenerEstudiantes(): void {
    this.privateAppService.obtener('director/obtenerEstudiantes').subscribe(
      (res) => {
        this.estudiantesDirector = res.data;
        this.loading=false;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  generarPdf(id: string): void {
    
  }

  public descargarCartaCompromiso(cedula:string): void {
    const datos = {
      identificacionEstudiante: cedula,
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

  public descargarSolicitudEstudiante(cedula:string): void {
    const datos = {
      identificacionEstudiante: cedula,
    };
    this.privateAppService.crear('formularios/generarVso001', datos).subscribe(
      (res) => {
        window.open(`${this.apiUrl}/${res.data}`, '_blank');
      },
      (error) => {
        this.appService.alertaError('ERROR', error.error.data);
        console.error(error);
      }
    );
  }

  descargarCompromisoRecepcion(cedula:string): void {
    const datos = {
      identificacionEstudiante: cedula,
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
  descargarInformeFinal(cedula:string): void {
    const datos = {
      identificacionEstudiante: cedula,
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

  descargarEvaluacionOrganizacion(cedula:string): void {
    const datos = {
      identificacionEstudiante:cedula,
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

  descargarEvaluacionDirector(cedula:string): void {
    const datos = {
      identificacionEstudiante: cedula,
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
