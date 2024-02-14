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
  niveles: any;
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

    this.niveles = {
      'PRIMER NIVEL': '1',
      'SEGUNDO NIVEL': '2',
      'TERCER NIVEL': '3',
      'CUARTO NIVEL': '4',
      'QUINTO NIVEL': '5',
      'SEXTO NIVEL': '6',
      'SEPTIMO NIVEL': '7',
      'OCTAVO NIVEL': '8',
      'NOVENO NIVEL': '9',
      'DÉCIMO NIVEL': '10',
    };

    this.compromisoBioseguridad = {
      carrera: '',
      nombreCompleto: '',
      identificacion: '',
      semestre: '',
      razonSocial: '',
    };

    this.obtenerCarreras();
    this.obtenerNiveles();
    this.obtenerOrganizaciones();
    this.buildformGroupInformacionEstudiante();
  }

  onSubmit(event: Event) {
    console.log(this.formGroupInformacionEstudiante);
    event.preventDefault();
    if (this.formGroupInformacionEstudiante.valid) {
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
  }

  public generarCartaCompromiso(): void {
    if (this.formularioCartaCompromiso.valid) {
      this.privateAppService
        .obtener('estudiantes/aceptarCompromisoBioseguridad')
        .subscribe(
          (res) => {
            const datos = {
              identificacionEstudiante: '1751592013',
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
    this.appService.alertaExito('OK', 'Carta de compromiso aceptada');
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
      estudiante: this.fb.group({
        carrera: ['', Validators.required],
        semestre: ['', Validators.required],
      }),
      organizacion: this.fb.group({
        nombreRazonSocial: ['', Validators.required],
      }),
    });
  }
  private obtenerCarreras(): void {
    this.carreraOpciones = [];
    this.privateAppService.obtener('catalogos?nombre=CARRERAS').subscribe(
      (res) => {
        this.carreraOpciones = res.data;
      },
      (error) => {
        this.appService.alertaError('ERROR', 'Error al obtener carreras');
        console.error(error);
      }
    );
  }

  private obtenerNiveles(): void {
    this.nivelOpciones = [];
    this.privateAppService.obtener('catalogos?nombre=NIVELES').subscribe(
      (res) => {
        this.nivelOpciones = res.data;
      },
      (error) => {
        this.appService.alertaError('ERROR', 'Error al obtener niveles');
        console.error(error);
      }
    );
  }
}
