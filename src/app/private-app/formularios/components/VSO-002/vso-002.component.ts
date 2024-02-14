import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompromisoRecepcion } from 'src/app/private-app/interfaces/compromiso-recepcion';
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
  constructor(
    private route: ActivatedRoute,
    private privateService: PrivateAppService,
    private appService: AppService,
    private fb: FormBuilder,
    private router: Router
  ) {
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
        horario: ['', Validators.required],
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
      datos.compromisoRecepcion.diasLaborables = 'CAMBIAR PRUEBA';

      this.privateService
        .crear('representante/recibirEstudiante', datos)
        .subscribe(
          (res) => {
            this.appService.alertaExito('OK', res.mensaje);
            this.router.navigateByUrl('/app/organization');
            // this.generarVso001('1751592013');
          },
          (err) => {
            this.appService.alertaError('ERROR', err.error.mensaje);
          }
        );
    }
  }
}
