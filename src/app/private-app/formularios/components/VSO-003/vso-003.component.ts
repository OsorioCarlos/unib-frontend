import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Catalogo } from 'src/app/private-app/interfaces/catalogo';
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
  carreraOpciones: Catalogo[];
  nivelOpciones: Catalogo[];

  constructor(
    private fb: FormBuilder,
    private privateAppService: PrivateAppService,
    private appService: AppService
  ) {
    this.formularioVSO003 = this.fb.group({
      id: ['', Validators.required],
      formulario: ['VSO-003', Validators.required],
      informacion_estudiante: this.fb.group({
        cedula: ['', Validators.required],
        nombre: ['', Validators.required],
        carrera: ['', Validators.required],
        nivel: ['', Validators.required],
        area_practica: ['', Validators.required],
        horas_practica: ['', Validators.required],
        fecha_inicio: ['', Validators.required],
        fecha_fin: ['', Validators.required],
      }),
      informacion_organizacion: this.fb.group({
        razon_social: ['', Validators.required],
        representante_legal: ['', Validators.required],
        area_dedicacion: ['', Validators.required],
        representante_estudiante: ['', Validators.required],
        area_practica: ['', Validators.required],
      }),
      calificacion: this.fb.group({
        criterios: this.fb.array([]),
        total: [0, Validators.required],
        nota_organizacion: ['', Validators.required],
        nota_promedio: [0, Validators.required],
        nota_final: [0, Validators.required],
        porcentaje_asistencia: [
          '',
          [Validators.required, Validators.min(0), Validators.max(100)],
        ],
        numero_horas_practicas: ['', Validators.required],
        observaciones: [''],
      }),
    });

    this.carreraOpciones = [];
    this.nivelOpciones = [];

    this.obtenerCarreras();
    this.obtenerNiveles();
    this.obtenerCriteriosCalificacion();
  }

  public guardarInformacion(): void {
    const datos = this.formularioVSO003.value;
    this.privateAppService.crear('calificaciones', datos).subscribe(
      (res) => {
        this.appService.alertaExito(
          'OK',
          'Se ha guardado la información correctamente'
        );
      },
      (err) => {
        this.appService.alertaError('ERROR', 'Error al guardar la información');
        console.error(err);
      }
    );
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
            informacion_organizacion: {
              razon_social: practicaPreProfesional.organization?.razon_social,
              representante_legal:
                practicaPreProfesional.organization?.representante_legal,
              area_dedicacion:
                practicaPreProfesional.organization?.area_dedicacion,
              // representante_estudiante: `${practicaPreProfesional.internship_representative?.user?.primer_nombre} ${practicaPreProfesional.internship_representative?.user?.segundo_nombre} ${practicaPreProfesional.internship_representative?.user?.primer_apellido} ${practicaPreProfesional.internship_representative?.user?.segundo_apellido}`,
              area_practica: practicaPreProfesional.area_practicas,
            },
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
    let total = 0;
    let promedio = 0;

    calificaciones.forEach((c) => {
      total += c.calificacion;
    });
    this.formularioVSO003.get('calificacion.total')?.setValue(total);

    promedio = total / calificaciones.length;
    this.formularioVSO003.get('calificacion.nota_promedio')?.setValue(promedio);

    promedio =
      (promedio +
        this.formularioVSO003.get('calificacion.nota_organizacion')?.value) /
      2;
    this.formularioVSO003.get('calificacion.nota_final')?.setValue(promedio);
  }

  public tranformarAbstractControlEnFormArray(
    abstractControl: AbstractControl
  ): FormArray {
    return abstractControl as FormArray;
  }

  private obtenerCarreras(): void {
    this.carreraOpciones = [];
    this.privateAppService.obtener('catalogos?nombre=CARRERAS').subscribe(
      (res) => {
        this.carreraOpciones = res.data;
      },
      (err) => {
        this.appService.alertaError('ERROR', 'Error al obtener carreras');
        console.error(err);
      }
    );
  }

  private obtenerNiveles(): void {
    this.nivelOpciones = [];
    this.privateAppService.obtener('catalogos?nombre=NIVELES').subscribe(
      (res) => {
        this.nivelOpciones = res.data;
      },
      (err) => {
        this.appService.alertaError('ERROR', 'Error al obtener niveles');
        console.error(err);
      }
    );
  }

  private obtenerCriteriosCalificacion(): void {
    this.nivelOpciones = [];
    this.privateAppService
      .obtener('catalogos?nombre=CRITERIOS CALIFFICACIÓN')
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
}
