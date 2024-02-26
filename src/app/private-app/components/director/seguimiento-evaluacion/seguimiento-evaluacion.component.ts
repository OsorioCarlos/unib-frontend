import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { AuthUser } from '../../../interfaces/auth-user';
import { User } from '../../../interfaces/user';
import { PrivateAppService } from '../../../services/private-app.service';

@Component({
  selector: 'app-seguimiento-evaluacion',
  templateUrl: './seguimiento-evaluacion.component.html',
  styleUrls: ['./seguimiento-evaluacion.component.css']
})
export class SeguimientoEvaluacionComponent {
    formGroupInformacionRepresentante!: FormGroup;
    representante: AuthUser;
    estudiantes: User[] = [];
    evaluacionesPendientes: User[] = [];
    constructor(
      private privateAppService: PrivateAppService,
      private appService: AppService,
      private fb: FormBuilder,
      private router: Router
    ) {
      this.representante = {
        cedula: '',
        nombre: '',
        tipo_usuario: '',
      };
      this.buildformGroupSolicitudPracticas();
      this.mostrarBienvenida();
      this.consultarEvaluacionesPendientes();
      this.consultarEvaluacionesPendientes();
    }
    mostrarBienvenida() {
      this.privateAppService.obtener('auth/authUser').subscribe(
        (res) => {
          this.representante = res.data;
        },
        (err) => {}
      );
    }
    private buildformGroupSolicitudPracticas(): void {
      this.formGroupInformacionRepresentante = this.fb.group({
        representante: this.fb.group({
          funcionRepresentante: ['', Validators.required],
          telefono: ['', Validators.required],
        }),
      });
    }
  
    onSubmit(event: Event) {
      event.preventDefault();
      if (this.formGroupInformacionRepresentante.valid) {
        const datos = this.formGroupInformacionRepresentante.value;
  
        this.privateAppService
          .crear('representante/completarInformacionBasica', datos)
          .subscribe(
            (res) => {
              this.router.navigateByUrl('/app/organization');
            },
            (err) => {
              console.log(err);
              this.appService.alertaError('ERROR', err.error.mensaje);
            }
          );
      }
    }
  
    consultarEvaluacionesPendientes(): void {
      this.privateAppService
        .obtener('director/obtenerEvaluacionesPendientes')
        .subscribe(
          (res) => {
            this.estudiantes = res.data;
          },
          (err) => {
            console.log(err);
          }
        );
    }
  }
  