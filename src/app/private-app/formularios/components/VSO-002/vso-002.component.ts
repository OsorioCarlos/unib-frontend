import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompromisoRecepcion } from 'src/app/private-app/interfaces/compromiso-recepcion';
import { DiasLaborables } from 'src/app/private-app/interfaces/dias-laborables';
import { PrivateAppService } from 'src/app/private-app/services/private-app.service';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-vso-002',
  templateUrl: './vso-002.component.html',
  styleUrls: ['./vso-002.component.css'],
})
export class VSO002Component {
  identificacionEstudiante: string = '';
  infoCompromisoRecepcion: CompromisoRecepcion;
  formCompromisoRecepcion!: FormGroup;
  diasLaborables: DiasLaborables;

  constructor(
    private route: ActivatedRoute,
    private privateService: PrivateAppService,
    private appService: AppService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.diasLaborables = {
      lunes: true,
      martes: true,
      miercoles: true,
      jueves: true,
      viernes: true,
      sabado: false,
      domingo: false,
    };
    this.infoCompromisoRecepcion = {
      razon_social: '',
      representante_legal: '',
      area_dedicacion: '',
      telefono: '',
      direccion: '',
      dias_habiles: '',
      horario: '',
      nombre_representante: '',
      funcion: '',
      telefono_representante: '',
      email_representante: '',
      nombre_estudiante: '',
      area_estudiante: '',
    };
    this.buildFormCompromisoRecepcion();
  }

  buildFormCompromisoRecepcion() {
    this.formCompromisoRecepcion = this.fb.group({
      compromisoRecepcion: this.fb.group({
        identificacionEstudiante: [''],
        objetivos: ['', Validators.required],
        tareas: ['', Validators.required],
        fechaInicio: ['', Validators.required],
        fechaFin: ['', Validators.required],
        horarioDesde: ['', Validators.required],
        horarioHasta: ['', Validators.required],
        diasLaborables: [''],
        aceptarCompromiso: [false, Validators.requiredTrue],
      }),
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.identificacionEstudiante = params.get('id') ?? '';
      this.consultarEstudiante();
    });
  }

  consultarEstudiante() {
    this.privateService
      .obtener(
        `representante/obtenerCompromisoRecepcion/${this.identificacionEstudiante}`
      )
      .subscribe(
        (response) => {
          this.infoCompromisoRecepcion = response.data;
          console.log(this.infoCompromisoRecepcion);
        },
        (error) => {
          this.appService.alertaError(
            'Error',
            'No se pudo consultar el estudiante'
          );
        }
      );
  }
  onSubmit(event: Event) {
    event.preventDefault();
    if (this.formCompromisoRecepcion.valid) {
      const datos = this.formCompromisoRecepcion.value;
      datos.compromisoRecepcion.identificacionEstudiante =
        this.identificacionEstudiante;
      datos.compromisoRecepcion.diasLaborables = this.obtenerDiasLaborables();

      this.privateService
        .crear('representante/recibirEstudiante', datos)
        .subscribe(
          (res) => {
            this.appService.alertaExito('OK', 'Estudiante aceptado con éxito');
            this.router.navigateByUrl('/app/organization');
          },
          (err) => {
            this.appService.alertaError('ERROR', err.error.mensaje);
          }
        );
    }
  }
  obtenerDiasLaborables(): string {
    let diasLaborablesTexto = '';
    if (this.diasLaborables.lunes) {
      diasLaborablesTexto += 'Lunes ';
    }
    if (this.diasLaborables.martes) {
      diasLaborablesTexto += 'Martes ';
    }
    if (this.diasLaborables.miercoles) {
      diasLaborablesTexto += 'Miercoles ';
    }
    if (this.diasLaborables.jueves) {
      diasLaborablesTexto += 'Jueves ';
    }
    if (this.diasLaborables.viernes) {
      diasLaborablesTexto += 'Viernes ';
    }
    if (this.diasLaborables.sabado) {
      diasLaborablesTexto += 'Sabado ';
    }
    if (this.diasLaborables.domingo) {
      diasLaborablesTexto += 'Domingo';
    }
    return diasLaborablesTexto;
  }

  seleccionarDia(dia: string, status: boolean) {
    switch (dia) {
      case 'lunes':
        this.diasLaborables.lunes = status;
        break;
      case 'martes':
        this.diasLaborables.martes = status;
        break;
      case 'miercoles':
        this.diasLaborables.miercoles = status;
        break;
      case 'jueves':
        this.diasLaborables.jueves = status;
        break;
      case 'viernes':
        this.diasLaborables.viernes = status;
        break;
      case 'sabado':
        this.diasLaborables.sabado = status;
        break;
      case 'domingo':
        this.diasLaborables.domingo = status;
        break;
    }
  }
}
