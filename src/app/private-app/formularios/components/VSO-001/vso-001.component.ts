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

@Component({
  selector: 'app-vso-001',
  templateUrl: './vso-001.component.html',
  styleUrls: ['./vso-001.component.css'],
})
export class VSO001Component {
  formGroupSolicitudPracticas!: FormGroup;
  nivelOpciones: Catalogo[];
  carreraOpciones: Catalogo[];

  constructor(private fb: FormBuilder, private privateAppService: PrivateAppService, private appService: AppService) {
    this.buildformGroupSolicitudPracticas();

    this.nivelOpciones = [];
    this.carreraOpciones = [];
  }

  ngOnInit(): void {
    this.obtenerCarreras();
    this.obtenerNiveles();
  }

  solicitarPractica(solicitarPracticaIn: SolicitarPracticaIn) {
    this.privateAppService
      .post('/estudiantes/solicitarPractica', solicitarPracticaIn)
      .subscribe({
        next: (response) => {
          console.log(response);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Solicitud enviada con éxito!',
            showConfirmButton: false,
            timer: 1500,
          });
        },
        error: (error) => {
          // throw error;
          alert(error.error.mensaje);
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Ha ocurrido un error intentalo más tarde',
            showConfirmButton: false,
            timer: 1500,
          });
        },
      });
  }

  obtenerVso001(identificacion : string) {
    this.privateAppService
      .get('/estudiantes/solicitarPractica/'+identificacion)
      .subscribe({
        next: (response) => {
          console.log(response);
        }
      });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.formGroupSolicitudPracticas.valid) {
        console.log('entro aca');
        let solicitarPracticaIn: SolicitarPracticaIn = {
          usuarioId: '1751592013',
          nivelId: this.formGroupSolicitudPracticas.get('nivelId')?.value,
          carreraId: this.formGroupSolicitudPracticas.get('carreraId')?.value,
          practicaPreprofesional: {
            area: this.formGroupSolicitudPracticas.get('area')?.value,
            estudianteCompromiso: this.formGroupSolicitudPracticas.get('estudianteCompromiso')?.value,
            numeroHoras: this.formGroupSolicitudPracticas.get('numeroHOras')?.value,
          },
        };
        console.log(this.formGroupSolicitudPracticas);
        this.solicitarPractica(solicitarPracticaIn);
      }
  }

  buscarEstudiante(): void {
    this.privateAppService.obtener(`estudiantes/buscarPorCedula/${this.formGroupSolicitudPracticas.get('informacion_estudiante.cedula')!.value}`).subscribe(res => {
      const usuario: Usuario = res.data;
      this.formGroupSolicitudPracticas.get('informacion_estudiante')?.setValue({
        cedula: usuario.identificacion,
        nombre: `${usuario.primer_nombre} ${usuario.segundo_nombre} ${usuario.primer_apellido} ${usuario.segundo_apellido}`,
        carrera: usuario.student?.carrera_id,
        nivel: usuario.student?.nivel_id,
        area: 'SIN ASIGNAR',
        numero_horas: '120'
      });
    }, error => {
      this.appService.alertaError('ERROR', 'Error al buscar estudiante');
      console.error(error);
    });
  }

  buscarRepresentantePracticas(): void {
    this.privateAppService.obtener(`representantes_practicas/buscarPorCedula/${this.formGroupSolicitudPracticas.get('informacion_organizacion.cedula_representante')!.value}`).subscribe(res => {
      const usuario: Usuario = res.data;
      this.formGroupSolicitudPracticas.get('informacion_organizacion')?.setValue({
        cedula_representante: usuario.identificacion,
        nombre_representante: `${usuario.primer_nombre} ${usuario.segundo_nombre} ${usuario.primer_apellido} ${usuario.segundo_apellido}`,
        ruc: usuario.internship_representative?.organization?.ruc,
        razon_social: usuario.internship_representative?.organization?.razon_social,
        representante_legal: usuario.internship_representative?.organization?.representante_legal,
        area_dedicacion: usuario.internship_representative?.organization?.area_dedicacion,
        direccion: usuario.internship_representative?.organization?.direccion,
        telefono: usuario.internship_representative?.organization?.telefono,
        email: usuario.email
      });
    }, error => {
      this.appService.alertaError('ERROR', 'Error al buscar estudiante');
      console.error(error);
    });
  }

  private buildformGroupSolicitudPracticas(): void {
    this.formGroupSolicitudPracticas = this.fb.group({
      informacion_estudiante: this.fb.group({
        cedula: ['', Validators.required],
        nombre: ['', Validators.required],
        carrera: ['', Validators.required],
        nivel: ['', Validators.required],
        area: ['', Validators.required],
        numero_horas: ['', Validators.required]
      }),
      informacion_organizacion: this.fb.group({
        ruc: ['', Validators.required],
        razon_social: ['', Validators.required],
        representante_legal: ['', Validators.required],
        area_dedicacion: ['', Validators.required],
        cedula_representante: ['', Validators.required],
        nombre_representante: ['', Validators.required],
        direccion: ['', Validators.required],
        telefono: ['', Validators.required],
        email: ['', Validators.required]
      }),
      aceptar_compromiso: ['', [Validators.required]]
    });
  }

  private obtenerCarreras(): void {
    this.carreraOpciones = [];
    this.privateAppService.obtener('catalogos?nombre=CARRERAS').subscribe(res => {
      this.carreraOpciones = res.data;
    }, error => {
      this.appService.alertaError('ERROR', 'Error al obtener carreras');
      console.error(error);
    });
  }

  private obtenerNiveles(): void {
    this.nivelOpciones = [];
    this.privateAppService.obtener('catalogos?nombre=NIVELES').subscribe(res => {
      this.nivelOpciones = res.data;
    }, error => {
      this.appService.alertaError('ERROR', 'Error al obtener niveles');
      console.error(error);
    });
  }

}
