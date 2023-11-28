import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import {
  PracticaPreprofesional,
  SolicitarPracticaIn,
} from 'src/app/private-app/models/SolicitarPracticaIn';
import { PrivateAppService } from 'src/app/private-app/services/private-app.service';

@Component({
  selector: 'app-vso-001',
  templateUrl: './vso-001.component.html',
  styleUrls: ['./vso-001.component.css'],
})
export class VSO001Component {
  formGroupSolicitudPracticas!: FormGroup;

  constructor(private privateAppService: PrivateAppService, private formBuilder: FormBuilder) {

  }
  ngOnInit(): void {
    this.buildformGroupSolicitudPracticas();
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

  buildformGroupSolicitudPracticas() {
    // this.id = this.route.snapshot.paramMap.get('id')!;
      this.formGroupSolicitudPracticas = this.formBuilder.group({
        nivelId: [null, [Validators.required]],
        area: [null, [Validators.required]],
        estudianteCompromiso: [null, [Validators.required]],
        numeroHoras: [null, [Validators.required]]
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
}
