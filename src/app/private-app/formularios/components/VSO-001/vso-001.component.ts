import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import {
  PracticaPreprofesional,
  SolicitarPracticaIn,
} from 'src/app/private-app/models/SolicitarPracticaIn';
import { PrivateAppService } from 'src/app/private-app/services/private-app.service';
import { AppService } from 'src/app/services/app.service';
import { Catalogo } from 'src/app/private-app/interfaces/catalogo';
import { Usuario } from 'src/app/private-app/interfaces/usuario';
import { InfoEstudiante } from 'src/app/private-app/interfaces/info-estudiante';
import { Organizacion } from 'src/app/private-app/interfaces/organizacion';
import { Router } from '@angular/router';
import { RepresentantePracticas } from 'src/app/private-app/interfaces/representante-practicas';
import { User } from 'src/app/private-app/interfaces/user';
import { environment } from 'src/environment/environment';
import { Estudiante } from 'src/app/private-app/interfaces/estudiante';
import { EstudianteInfo } from 'src/app/private-app/interfaces/estudiante-info';

@Component({
  selector: 'app-vso-001',
  templateUrl: './vso-001.component.html',
  styleUrls: ['./vso-001.component.css'],
})
export class VSO001Component {
  formGroupSolicitudPracticas!: FormGroup;
  nivelOpciones: Catalogo[];
  carreraOpciones: Catalogo[];
  organizacion!: Organizacion;
  estudiante!: EstudianteInfo;
  apiUrl: string = environment.apiUrl;

  constructor(
    private fb: FormBuilder,
    private privateAppService: PrivateAppService,
    private appService: AppService,
    private router: Router
  ) {
    this.buildformGroupSolicitudPracticas();

    this.nivelOpciones = [];
    this.carreraOpciones = [];
    this.buscarOrganizacion();
    this.buscarEstudiante();
  }

  ngOnInit(): void {
    this.estudiante = {
      escuela: '',
      nivel: '',
      nombre: '',
    };
    this.organizacion = {
      id:0,
      razon_social: '',
      representante_legal: '',
      direccion: '',
      telefono: '',
      email: '',
      area_dedicacion: '',
      horario: '',
      dias_laborables: '',
      created_at: new Date,
      updated_at: new Date,
      internship_representatives: []
    };
    this.obtenerCarreras();
    this.obtenerNiveles();
  }

  private buildformGroupSolicitudPracticas(): void {
    this.formGroupSolicitudPracticas = this.fb.group({
      practicaPreprofesional: this.fb.group({
        areaPropuesta: ['', Validators.required],
        horasSolicitadas: ['', Validators.required],
      }),
      organizacion: this.fb.group({
        representante: ['', Validators.required]
      }),
      compromisoEstudiante: this.fb.group({
        acepta: ['', [Validators.required]],
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

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.formGroupSolicitudPracticas.valid) {
      const datos = this.formGroupSolicitudPracticas.value;
      datos.organizacion.diasHabiles = 'lun / mar';

      this.privateAppService
        .crear('estudiantes/solicitarPracticas', datos)
        .subscribe(
          (res) => {
            this.appService.alertaExito('OK', res.mensaje);
            this.generarVso001('1751592013');
          },
          (err) => {
            console.log(err);
            this.appService.alertaError('ERROR', err.error.mensaje);
          }
        );
    }
  }

  buscarEstudiante(): void {
    this.privateAppService
      .obtener('estudiantes/obtenerEstudiante')
      .subscribe((res) => {
        this.estudiante = res.data;
        console.log(this.estudiante);
      });
  }

  buscarOrganizacion(): void {
    this.privateAppService
      .obtener('estudiantes/consultarOrganizacionAsignada')
      .subscribe((res) => {
        this.organizacion = res.data;
        console.log(this.organizacion);
      });
  }

  public generarVso001(identificacionEstudiante:string): void {
    const datos = {
      'identificacionEstudiante': identificacionEstudiante
    };
        this.privateAppService.crear('formularios/generarVso001', datos).subscribe(res => {
          window.open(`${this.apiUrl}/${res.data}`, '_blank');
        }, error => {
          this.appService.alertaError('ERROR', 'Error al generar la solicitud');
          console.error(error);
        });
      this.router.navigateByUrl('/app/student');
  }

}
