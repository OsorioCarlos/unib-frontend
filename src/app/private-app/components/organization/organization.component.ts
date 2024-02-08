import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';
import { PrivateAppService } from '../../services/private-app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent {
  representanteCompletoInformacionBasica: boolean = false;
  formGroupInformacionRepresentante!: FormGroup;

  constructor(
    private privateAppService: PrivateAppService,
    private appService: AppService,
    private fb: FormBuilder,
    private router: Router

  ) {
    this.buildformGroupSolicitudPracticas();
    this.consultarInformaciónRepresentante();
  }

  private buildformGroupSolicitudPracticas(): void {
    this.formGroupInformacionRepresentante = this.fb.group({
      representante: this.fb.group({
        funcionRepresentante: ['', Validators.required],
        telefono: ['', Validators.required],
      })
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
            this.appService.alertaExito('OK', res.mensaje);
            this.router.navigateByUrl('/app/organization');
          },
          (err) => {
            console.log(err);
            this.appService.alertaError('ERROR', err.error.mensaje);
          }
        );
    }
  }

  consultarInformaciónRepresentante(): void {
    this.privateAppService.obtener('representante/obtenerInformacionRepresentantePracticas').subscribe(
      (res) => {
        this.representanteCompletoInformacionBasica = res.data;
      },
      (err) => {
        console.log(err);
        this.appService.alertaInformacion('Bienvenido!', 'Completa tu información para acceder al sistema.');
      }
    );
  }
}
