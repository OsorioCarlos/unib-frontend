import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Catalogo } from 'src/app/private-app/interfaces/catalogo';
import { InformeEstudiante } from 'src/app/private-app/interfaces/informe-estudiante';
import { PracticaPreProfesional } from 'src/app/private-app/interfaces/practica-preprofesional';
import { PrivateAppService } from 'src/app/private-app/services/private-app.service';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-vso-005',
  templateUrl: './vso-005.component.html',
  styleUrls: ['./vso-005.component.css'],
})
export class VSO005Component {
  formularioVSO005: FormGroup;
  carreraOpciones: Catalogo[];
  nivelOpciones: Catalogo[];
  apiUrl: string = environment.apiUrl;
  informeEstudiante: InformeEstudiante;

  constructor(
    private fb: FormBuilder,
    private privateAppService: PrivateAppService,
    private appService: AppService,
    private route: Router
  ) {
    this.formularioVSO005 = this.fb.group({
      informe: this.fb.group({
        cumplimiento_objetivos: ['', Validators.required],
        beneficios: ['', Validators.required],
        aprendizajes: ['', Validators.required],
        desarrollo_personal: ['', Validators.required],
        comentarios: ['', Validators.required],
        recomendaciones: ['', Validators.required],
      }),
    });

    this.carreraOpciones = [];
    this.nivelOpciones = [];
    this.informeEstudiante = {
      identificacion: '',
      nombre_estudiante: '',
      carrera: '',
      nivel: '',
      organizacion: '',
      numero_horas_realizada: '',
      fecha_inicio: '',
      fecha_fin: '',
    };

    this.obtenerInformeEstudiante();
  }

  public guardarInformacion(): void {
    const datos = this.formularioVSO005.value;
    this.privateAppService
      .crear('estudiantes/enviarInformeFinal', datos)
      .subscribe(
        (res) => {
          this.generarVso005(this.informeEstudiante.identificacion);
        },
        (err) => {
          this.appService.alertaError('ERROR', err.error.message);
          console.error(err);
        }
      );
  }

  public buscarEstudiante(): void {
    this.privateAppService
      .obtener(
        `formularios/informacionVSO005/${
          this.formularioVSO005.get('informacion_estudiante.cedula')!.value
        }`
      )
      .subscribe(
        (res) => {
          const practicaPreProfesional: PracticaPreProfesional = res.data;
          this.formularioVSO005.patchValue({
            id: practicaPreProfesional.id,
            informacion_estudiante: {
              cedula: practicaPreProfesional.student?.user?.identificacion,
              nombre: `${practicaPreProfesional.student?.user?.nombre_completo}`,
              carrera: practicaPreProfesional.student?.carrera_id,
              nivel: practicaPreProfesional.student?.nivel_id,
              area_practica: practicaPreProfesional.area_practicas,
              horas_practica: practicaPreProfesional.numero_horas_practicas,
              fecha_inicio: practicaPreProfesional.fecha_inicio,
              fecha_fin: practicaPreProfesional.fecha_fin,
            },
          });
        },
        (err) => {
          this.appService.alertaError('ERROR', err.error.message);
          console.error(err);
        }
      );
  }

  public generarVso005(identificacionEstudiante: string): void {
    const datos = {
      identificacionEstudiante: identificacionEstudiante,
    };
    this.privateAppService.crear('formularios/generarVso005', datos).subscribe(
      (res) => {
        window.open(`${this.apiUrl}/${res.data}`, '_blank');
      },
      (error) => {
        this.appService.alertaError('ERROR', 'Error al generar la solicitud');
        console.error(error);
      }
    );
    this.route.navigateByUrl('/app/student');
  }

  private obtenerInformeEstudiante(): void {
    this.privateAppService
      .obtener('estudiantes/obtenerInformeEstudiante')
      .subscribe(
        (res) => {
          this.informeEstudiante = res.data;
        },
        (err) => {
          this.appService.alertaError(
            'ERROR',
            'Error al obtener el informe del estudiante'
          );
        }
      );
  }
}
