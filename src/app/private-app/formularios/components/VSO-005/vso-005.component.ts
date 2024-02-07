import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Catalogo } from 'src/app/private-app/interfaces/catalogo';
import { PracticaPreProfesional } from 'src/app/private-app/interfaces/practica-preprofesional';
import { PrivateAppService } from 'src/app/private-app/services/private-app.service';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-vso-005',
  templateUrl: './vso-005.component.html',
  styleUrls: ['./vso-005.component.css']
})
export class VSO005Component {

  formularioVSO005: FormGroup;
  carreraOpciones: Catalogo[];
  nivelOpciones: Catalogo[];

  constructor(private fb: FormBuilder, private privateAppService: PrivateAppService, private appService: AppService, private route : Router) {
    this.formularioVSO005 = this.fb.group({
      informe: this.fb.group({
        cumplimiento_objetivos: ['', Validators.required],
        beneficios: ['', Validators.required],
        aprendizajes: ['', Validators.required],
        desarrollo_personal: ['', Validators.required],
        comentarios: ['', Validators.required],
        recomendaciones: ['', Validators.required]
      })
    });

    this.carreraOpciones = [];
    this.nivelOpciones = [];

    this.obtenerCarreras();
    this.obtenerNiveles();
  }


  public guardarInformacion(): void {
    const datos = this.formularioVSO005.value;
    this.privateAppService.crear('estudiantes/enviarInformeFinal', datos).subscribe(res => {
      this.appService.alertaExito('OK', 'Se ha guardado la información correctamente');
      this.route.navigateByUrl('/app/student');
    }, err => {
      this.appService.alertaError('ERROR', 'Error al buscar información del estudiante');
      console.error(err);
    });
  }

  public buscarEstudiante(): void {
    this.privateAppService.obtener(`formularios/informacionVSO005/${this.formularioVSO005.get('informacion_estudiante.cedula')!.value}`).subscribe(res => {
      const practicaPreProfesional: PracticaPreProfesional = res.data;
      this.formularioVSO005.patchValue({
        id: practicaPreProfesional.id,
        informacion_estudiante: {
          cedula: practicaPreProfesional.student?.user?.identificacion,
          nombre: `${practicaPreProfesional.student?.user?.primer_nombre} ${practicaPreProfesional.student?.user?.segundo_nombre} ${practicaPreProfesional.student?.user?.primer_apellido} ${practicaPreProfesional.student?.user?.segundo_apellido}`,
          carrera: practicaPreProfesional.student?.carrera_id,
          nivel: practicaPreProfesional.student?.nivel_id,
          area_practica: practicaPreProfesional.area_practicas,
          horas_practica: practicaPreProfesional.numero_horas_practicas,
          fecha_inicio: practicaPreProfesional.fecha_inicio,
          fecha_fin: practicaPreProfesional.fecha_fin
        }
      });
    }, err => {
      this.appService.alertaError('ERROR', 'Error al buscar información del estudiante');
      console.error(err);
    });
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
}
