import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Catalogo } from 'src/app/private-app/interfaces/catalogo';
import { InfoEvaluacion } from 'src/app/private-app/interfaces/info-evaluacion';
import { PracticaPreProfesional } from 'src/app/private-app/interfaces/practica-preprofesional';
import { PrivateAppService } from 'src/app/private-app/services/private-app.service';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-vso-003',
  templateUrl: './vso-003.component.html',
  styleUrls: ['./vso-003.component.css'],
})
export class VSO003Component {
  formularioVSO003: FormGroup;
  identificacionEstudiante: string = '';
  infoEvaluacionDirector: InfoEvaluacion;
  horasAprobadas: number = 0;

  constructor(
    private fb: FormBuilder,
    private privateAppService: PrivateAppService,
    private appService: AppService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.infoEvaluacionDirector = {
      razon_social: '',
      representante_legal: '',
      area_dedicacion: '',
      representante: '',
      nombre_estudiante: '',
      escuela: '',
      nivel: '',
      area_practicas: '',
      horas_practicas: 0,
      fecha_inicio: '',
      fecha_fin: '',
      nota_organizacion: '',
    };
    this.formularioVSO003 = this.fb.group({
      id: [''],
      formulario: ['VSO-003', Validators.required],
      calificacion: this.fb.group({
        criterios: this.fb.array([]),
        nota_promedio: [0, Validators.required],
        nota_final: [0, Validators.required],
        porcentaje_asistencia: [
          '',
          [Validators.required, Validators.min(0), Validators.max(100)],
        ],
        observaciones: [''],
      }),
    });
    this.obtenerCriteriosCalificacion();
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.identificacionEstudiante = params.get('id') ?? '';
    });
    this.obtenerInformacionEvaluacion();
    this.calcularNotaPromedio();
  }

  onSubmit(event: Event) {
    let forms: HTMLFormElement = document.querySelector('.needs-validation')!;
    
    if (!forms!.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
      this.appService.alertaAviso(
        'Completa el formulario',
        'Revisa los campos requeridos'
      );
    } else {
      if (this.formularioVSO003.valid) {
        const datos = this.formularioVSO003.value;
        datos.id = this.identificacionEstudiante;
        this.privateAppService.crear('calificaciones', datos).subscribe(
          (res) => {
            this.appService.alertaExito(
              'OK',
              'Se ha notificado el seguimiento y evaluación al estudiante'
            );
            this.router.navigateByUrl('/app/director/seguimiento-evaluacion');
          },
          (err) => {
            this.appService.alertaError('ERROR', err.error.mensaje);
            console.error(err);
          }
        );
      }
    }
    forms!.classList.add('was-validated');
  }
  public calcularHorasAprobadas(){
    this.horasAprobadas = (parseInt(this.formularioVSO003.get('calificacion.porcentaje_asistencia')?.value) * this.infoEvaluacionDirector.horas_practicas)/100;
  }
  public buscarEstudiante(): void {
    this.privateAppService
      .obtener(
        `formularios/informacionVSO003/${
          this.formularioVSO003.get('informacion_estudiante.cedula')!.value
        }`
      )
      .subscribe(
        (res) => {
          const practicaPreProfesional: PracticaPreProfesional = res.data;
          let notaOrganizacion = null;
          if (
            practicaPreProfesional.grades &&
            practicaPreProfesional.grades?.length > 0
          ) {
            notaOrganizacion = practicaPreProfesional.grades[0].nota_promedio;
          } else {
            this.appService.alertaAviso(
              'AVISO',
              'La organización aún no ha evaluado al estudiante'
            );
          }
          this.formularioVSO003.patchValue({
            id: practicaPreProfesional.id,
            calificacion: {
              nota_organizacion: notaOrganizacion,
              numero_horas_practicas:
                practicaPreProfesional.numero_horas_practicas,
            },
          });
        },
        (err) => {
          this.appService.alertaError(
            'ERROR',
            'Error al buscar información del estudiante'
          );
          console.error(err);
        }
      );
  }

  public calcularNotaPromedio(): void {
    const calificaciones: {
      id: number;
      nombre: string;
      calificacion: number;
    }[] = this.formularioVSO003.get('calificacion.criterios')?.value;
    let sumatoria = 0;
    let total = 0;
    let promedio = 0;

    calificaciones.forEach((c) => {
      sumatoria += c.calificacion;
    });
    this.formularioVSO003.get('calificacion.nota_promedio')?.setValue(total);

    total = sumatoria / calificaciones.length;
    this.formularioVSO003.get('calificacion.nota_promedio')?.setValue(total);

    promedio =
      (total + parseInt(this.infoEvaluacionDirector.nota_organizacion)) / 2;
    this.formularioVSO003.get('calificacion.nota_final')?.setValue(promedio);
  }

  public tranformarAbstractControlEnFormArray(
    abstractControl: AbstractControl
  ): FormArray {
    return abstractControl as FormArray;
  }

  private obtenerCriteriosCalificacion(): void {
    this.privateAppService
      .obtener('catalogos?nombre=CRITERIOS CALIFICACIÓN')
      .subscribe(
        (res) => {
          const criterioCalificacionCatalogos: Catalogo[] = res.data;
          const criterioFormArray = this.tranformarAbstractControlEnFormArray(
            this.formularioVSO003.get('calificacion.criterios')!
          );
          criterioCalificacionCatalogos.forEach((criterioCalifiacion) => {
            criterioFormArray.push(
              this.fb.group({
                id: [criterioCalifiacion.id],
                nombre: [criterioCalifiacion.nombre],
                calificacion: [
                  '',
                  [Validators.required, Validators.min(0), Validators.max(30)],
                ],
              })
            );
          });
        },
        (err) => {
          this.appService.alertaError(
            'ERROR',
            'Error al obtener criterios calificación'
          );
          console.error(err);
        }
      );
  }

  obtenerInformacionEvaluacion() {
    this.privateAppService
      .obtener(
        `director/obtenerInformacionEvaluacion/${this.identificacionEstudiante}`
      )
      .subscribe(
        (res) => {
          this.infoEvaluacionDirector = res.data;
        },
        (err) => {
          console.error(err);
        }
      );
  }
}
