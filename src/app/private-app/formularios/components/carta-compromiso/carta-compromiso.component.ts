import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Catalogo } from 'src/app/private-app/interfaces/catalogo';
import { CompromisoBioseguridad } from 'src/app/private-app/interfaces/compromiso-bioseguridad';
import { Organizacion } from 'src/app/private-app/interfaces/organizacion';
import { PrivateAppService } from 'src/app/private-app/services/private-app.service';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-carta-compromiso',
  templateUrl: './carta-compromiso.component.html',
  styleUrls: ['./carta-compromiso.component.css'],
})
export class CartaCompromisoComponent {
  formularioCartaCompromiso: FormGroup;
  apiUrl: string = environment.apiUrl;
  meses: string[];
  compromisoBioseguridad: CompromisoBioseguridad;
  nivelOpciones: Catalogo[];
  carreraOpciones: Catalogo[];
  organizaciones: Organizacion[] = [];
  formGroupInformacionEstudiante!: FormGroup;
  mostrarFormularioEstudiante: boolean = true;

  constructor(
    private fb: FormBuilder,
    private privateAppService: PrivateAppService,
    private appService: AppService,
    private router: Router
  ) {
    this.formularioCartaCompromiso = this.fb.group({
      cedula_estudiante: ['', Validators.required],
      nombre_estudiante: ['', Validators.required],
      carrera: ['', Validators.required],
      semestre: ['', Validators.required],
      empresa: ['', Validators.required],
      fecha_texto: ['', Validators.required],
    });
    this.nivelOpciones = [];
    this.carreraOpciones = [];
    this.meses = [
      'enero',
      'febrero',
      'marzo',
      'abril',
      'mayo',
      'junio',
      'julio',
      'agosto',
      'septiembre',
      'octubre',
      'noviembre',
      'diciembre',
    ];

    this.compromisoBioseguridad = {
      carrera: '',
      nombreCompleto: '',
      identificacion: '',
      semestre: '',
      razonSocial: '',
    };

    this.obtenerInfoCartaCompromiso();
    this.obtenerOrganizaciones();
    this.buildformGroupInformacionEstudiante();
  }

  onSubmit(event: Event) {
    let forms: HTMLFormElement = document.querySelector('.needs-validation')!;

    if (!forms!.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
      this.appService.alertaAviso('Completa el formulario', 'Revisa los campos requeridos');
    }else if (this.formGroupInformacionEstudiante.valid) {
      const datos = this.formGroupInformacionEstudiante.value;
      this.privateAppService
        .crear('estudiantes/generarCartaCompromiso', datos)
        .subscribe(
          (res) => {
            this.completarCartaComprmiso();
          },
          (err) => {
            console.log(err);
            this.appService.alertaError('ERROR', err.error.mensaje);
          }
        );
    }
    forms!.classList.add('was-validated');
  }


  public generarCartaCompromiso(): void {
    if (this.formularioCartaCompromiso.valid) {
      this.privateAppService
        .obtener('estudiantes/aceptarCompromisoBioseguridad')
        .subscribe(
          (res) => {
            const datos = {
              identificacionEstudiante:
                this.compromisoBioseguridad.identificacion,
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
          },
          (error) => {
            this.appService.alertaError('ERROR', error.error.mensaje);
          }
        );
    }
    this.router.navigateByUrl('/app/student');
  }

  private completarCartaComprmiso(): void {
    this.privateAppService
      .obtener('estudiantes/obtenerInfoCompromiso')
      .subscribe(
        (res) => {
          this.compromisoBioseguridad = res.data;
          this.formularioCartaCompromiso.setValue({
            cedula_estudiante: this.compromisoBioseguridad.identificacion,
            nombre_estudiante: this.compromisoBioseguridad.nombreCompleto,
            carrera: this.compromisoBioseguridad.carrera,
            semestre: this.compromisoBioseguridad.semestre,
            empresa: this.compromisoBioseguridad.razonSocial,
            fecha_texto: this.devolverFechaTexto(),
          });
          this.mostrarFormularioEstudiante = false;
        },
        (error) => {
          this.mostrarFormularioEstudiante = true;
        }
      );
  }

  private devolverFechaTexto(): string {
    const fechaActual = new Date();
    return `${fechaActual.getDate()} de ${
      this.meses[fechaActual.getMonth()]
    } del ${fechaActual.getFullYear()}`;
  }

  obtenerOrganizaciones() {
    this.privateAppService
      .obtener('estudiantes/obtenerOrganizaciones')
      .subscribe(
        (res) => {
          this.organizaciones = res.data;
        },
        (error) => {
          this.appService.alertaError('ERROR', error.error.mensaje);
          console.error(error);
        }
      );
  }

  private buildformGroupInformacionEstudiante(): void {
    this.formGroupInformacionEstudiante = this.fb.group({
      organizacion: this.fb.group({
        nombreRazonSocial: ['', Validators.required],
      }),
    });
  }

  public obtenerInfoCartaCompromiso(): void {
    this.privateAppService
      .obtener('estudiantes/obtenerInfoCompromiso')
      .subscribe(
        (res) => {
          this.compromisoBioseguridad = res.data;
        },
        (error) => {
          this.appService.alertaError('ERROR', error.error.mensaje);
          console.error(error);
        }
      );
  }
}
