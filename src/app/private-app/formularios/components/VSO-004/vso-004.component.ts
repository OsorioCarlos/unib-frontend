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
  selector: 'app-vso-004',
  templateUrl: './vso-004.component.html',
  styleUrls: ['./vso-004.component.css'],
})
export class VSO004Component {
  formularioVSO004: FormGroup;
  identificacionEstudiante: string = '';
  infoEvaluacionRepresentante: InfoEvaluacion;
  constructor(
    private fb: FormBuilder,
    private privateAppService: PrivateAppService,
    private appService: AppService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.infoEvaluacionRepresentante = {
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

    this.formularioVSO004 = this.fb.group({
      id: [''],
      formulario: ['VSO-004', Validators.required],
      calificacion: this.fb.group({
        criterios: this.fb.array([]),
        nota_promedio: [0, Validators.required],
        porcentaje_asistencia: [
          '',
          [Validators.required, Validators.min(0), Validators.max(100)],
        ],
        observaciones: ['', Validators.required],
        recomendaciones: ['', Validators.required],
      }),
    });

    this.obtenerCriteriosCalificacion();
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.identificacionEstudiante = params.get('id') ?? '';
      this.obtenerInformacionEvaluacion();
    });
  }

  public onSubmit(event:Event): void {
    let forms: HTMLFormElement = document.querySelector('.needs-validation')!;
    if (!forms!.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
      this.appService.alertaAviso(
        'Completa el formulario',
        'Revisa los campos requeridos'
      );
    } else {
      if (this.formularioVSO004.valid) {
        let datos = this.formularioVSO004.value;
        datos.id = this.identificacionEstudiante;
        this.privateAppService.crear('calificaciones', datos).subscribe(
          (res) => {
            this.appService.alertaExito(
              'OK',
              'Se ha notificado el seguimiento y evaluación al director y al estudiante'
            );
            this.router.navigateByUrl('app/representante');
          },
          (err) => {
            this.appService.alertaError(
              'ERROR',
              'Error al guardar la información'
            );
            console.error(err);
          }
        );
      }
    }
    forms!.classList.add('was-validated');
  }

  public calcularNotaPromedio(): void {
    const calificaciones: {
      id: number;
      nombre: string;
      calificacion: number;
    }[] = this.formularioVSO004.get('calificacion.criterios')?.value;
    let total = 0;
    let promedio = 0;

    calificaciones.forEach((c) => {
      total += c.calificacion;
    });
    promedio = total / calificaciones.length;
    this.formularioVSO004.get('calificacion.nota_promedio')?.setValue(promedio);
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
            this.formularioVSO004.get('calificacion.criterios')!
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
        `representante/obtenerInformacionEvaluacion/${this.identificacionEstudiante}`
      )
      .subscribe(
        (res) => {
          this.infoEvaluacionRepresentante = res.data;
        },
        (err) => {
          console.error(err);
        }
      );
  }
}
