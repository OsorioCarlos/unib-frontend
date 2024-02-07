import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Catalogo } from 'src/app/private-app/interfaces/catalogo';
import { PracticaPreProfesional } from 'src/app/private-app/interfaces/practica-preprofesional';
import { PrivateAppService } from 'src/app/private-app/services/private-app.service';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-vso-004',
  templateUrl: './vso-004.component.html',
  styleUrls: ['./vso-004.component.css']
})
export class VSO004Component {

  formularioVSO004: FormGroup;
  carreraOpciones: Catalogo[];
  nivelOpciones: Catalogo[];

  constructor(private fb: FormBuilder, private privateAppService: PrivateAppService, private appService: AppService) {
    this.formularioVSO004 = this.fb.group({
      id: ['', Validators.required],
      formulario: ['VSO-004', Validators.required],
      // informacion_organizacion: this.fb.group({
      //   ruc: ['', Validators.required],
      //   razon_social: ['', Validators.required],
      //   representante_legal: ['', Validators.required],
      //   area_dedicacion: ['', Validators.required],
      //   representante_estudiante: ['', Validators.required],
      //   area_practica: ['', Validators.required]
      // }),
      // informacion_estudiante: this.fb.group({
      //   nombre: ['', Validators.required],
      //   carrera: ['', Validators.required],
      //   nivel: ['', Validators.required],
      //   area_practica: ['', Validators.required],
      //   horas_practica: ['', Validators.required],
      //   fecha_inicio: ['', Validators.required],
      //   fecha_fin: ['', Validators.required]
      // }),
      calificacion: this.fb.group({
        criterios: this.fb.array([]),
        nota_promedio: [0, Validators.required],
        porcentaje_asistencia: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
        numero_horas_practicas: ['', Validators.required],
        observaciones: [''],
        recomendaciones: ['']
      })
    });

    this.carreraOpciones = [];
    this.nivelOpciones = [];

    this.obtenerCarreras();
    this.obtenerNiveles();
    this.obtenerCriteriosCalificacion();
  }

  public guardarInformacion(): void {
    const datos = this.formularioVSO004.value;
    this.privateAppService.crear('calificaciones', datos).subscribe(res => {
      this.appService.alertaExito('OK', 'Se ha guardado la información correctamente');
    }, err => {
      this.appService.alertaError('ERROR', 'Error al guardar la información');
      console.error(err);
    });
  }

  public buscarOrganizacion(): void {
    this.privateAppService.obtener(`formularios/informacionVSO004/${this.formularioVSO004.get('informacion_organizacion.ruc')!.value}`).subscribe(res => {
      const practicaPreProfesional: PracticaPreProfesional = res.data;
      this.formularioVSO004.patchValue({
        id: practicaPreProfesional.id,
        informacion_estudiante: {
          nombre: `${practicaPreProfesional.student?.user?.primer_nombre} ${practicaPreProfesional.student?.user?.segundo_nombre} ${practicaPreProfesional.student?.user?.primer_apellido} ${practicaPreProfesional.student?.user?.segundo_apellido}`,
          carrera: practicaPreProfesional.student?.carrera_id,
          nivel: practicaPreProfesional.student?.nivel_id,
          area_practica: practicaPreProfesional.area_practicas,
          horas_practica: practicaPreProfesional.numero_horas_practicas,
          fecha_inicio: practicaPreProfesional.fecha_inicio,
          fecha_fin: practicaPreProfesional.fecha_fin
        },
        informacion_organizacion: {
          razon_social: practicaPreProfesional.organization?.razon_social,
          representante_legal: practicaPreProfesional.organization?.representante_legal,
          area_dedicacion: practicaPreProfesional.organization?.area_dedicacion,
          // representante_estudiante: `${practicaPreProfesional.internship_representative?.user?.primer_nombre} ${practicaPreProfesional.internship_representative?.user?.segundo_nombre} ${practicaPreProfesional.internship_representative?.user?.primer_apellido} ${practicaPreProfesional.internship_representative?.user?.segundo_apellido}`,
          area_practica: practicaPreProfesional.area_practicas
        },
        calificacion: {
          numero_horas_practicas: practicaPreProfesional.numero_horas_practicas
        }
      });
    }, err => {
      this.appService.alertaError('ERROR', 'Error al buscar información del estudiante');
      console.error(err);
    });
  }

  public calcularNotaPromedio(): void {
    const calificaciones: {id: number, nombre: string, calificacion: number}[] = this.formularioVSO004.get('calificacion.criterios')?.value;
    let total = 0;
    let promedio = 0;

    calificaciones.forEach(c => {
      total += c.calificacion;
    });
    promedio = total / calificaciones.length;
    this.formularioVSO004.get('calificacion.nota_promedio')?.setValue(promedio);
  }

  public tranformarAbstractControlEnFormArray(abstractControl: AbstractControl): FormArray {
    return abstractControl as FormArray;
  }

  private obtenerCarreras(): void {
    this.carreraOpciones = [];
    this.privateAppService.obtener('catalogos?nombre=CARRERAS').subscribe(res => {
      this.carreraOpciones = res.data;
    }, err => {
      this.appService.alertaError('ERROR', 'Error al obtener carreras');
      console.error(err);
    });
  }

  private obtenerNiveles(): void {
    this.nivelOpciones = [];
    this.privateAppService.obtener('catalogos?nombre=NIVELES').subscribe(res => {
      this.nivelOpciones = res.data;
    }, err => {
      this.appService.alertaError('ERROR', 'Error al obtener niveles');
      console.error(err);
    });
  }

  private obtenerCriteriosCalificacion(): void {
    this.nivelOpciones = [];
    this.privateAppService.obtener('catalogos?nombre=CRITERIOS CALIFFICACIÓN').subscribe(res => {
      const criterioCalificacionCatalogos: Catalogo[] = res.data;
      const criterioFormArray = this.tranformarAbstractControlEnFormArray(this.formularioVSO004.get('calificacion.criterios')!);
      criterioCalificacionCatalogos.forEach(criterioCalifiacion => {
        criterioFormArray.push(this.fb.group({
          id: [criterioCalifiacion.id],
          nombre: [criterioCalifiacion.nombre],
          calificacion: ['', [Validators.required, Validators.min(0), Validators.max(30)]]
        }));
      });
    }, err => {
      this.appService.alertaError('ERROR', 'Error al obtener criterios calificación');
      console.error(err);
    });
  }
}
