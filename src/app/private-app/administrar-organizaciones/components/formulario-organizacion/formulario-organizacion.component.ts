import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Organizacion } from 'src/app/private-app/interfaces/organizacion';

import { PrivateAppService } from 'src/app/private-app/services/private-app.service';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-formulario-organizacion',
  templateUrl: './formulario-organizacion.component.html',
  styleUrls: ['./formulario-organizacion.component.css']
})
export class FormularioOrganizacionComponent {

  formularioOrganizacion: FormGroup;

  constructor(
    private fb: FormBuilder,
    private privateAppService: PrivateAppService,
    private appService: AppService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.formularioOrganizacion = this.fb.group({
      id: [''],
      ruc: ['', Validators.required],
      razon_social: ['', Validators.required],
      representante_legal: ['', Validators.required],
      direccion: ['', [Validators.required]],
      telefono: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      area_dedicacion: ['', Validators.required],
      horario: ['', Validators.required],
      dias_laborables: ['', Validators.required]
    });

    this.activatedRoute.params.subscribe((params: Params) => {
      this.formularioOrganizacion.get('id')?.setValue(params['id']);
    });

    if (this.formularioOrganizacion.get('id')?.value) {
      this.obtenerOrganizacion();
    }
  }

  ngOnInit(): void {
    
  }

  public validarRucUnico(): void {
    const ruc = this.formularioOrganizacion.get('ruc')?.value;
    this.privateAppService.obtener(`organizaciones/validarOrganizacionDuplicada/${ruc}`).subscribe({
      next: res => {
        if (res.data == false) {
          this.appService.alertaAviso('RUC DUPLICADO', 'Ya existe una organización con este RUC');
          this.formularioOrganizacion.get('ruc')?.setValue(null);
        }
      },
      error: err => {
        this.appService.alertaError('ERROR', 'Error al validar el RUC');
        console.error(err);
      }
    });
  }

  public guardarInformacion(): void {
    const datos = {
      organizacion: this.formularioOrganizacion.value
    };
    if (this.formularioOrganizacion.get('id')?.value) {
      this.privateAppService.actualizar('organizaciones', this.formularioOrganizacion.get('id')?.value, datos).subscribe({
        next: () => {
          this.formularioOrganizacion.reset();
          this.appService.alertaExito('OK', 'Se ha guardado la informacion correctamente').then(() => {
            this.router.navigateByUrl('/app/administrar-organizaciones/listado');
          });
        },
        error: err => {
          this.appService.alertaError('ERROR', 'Error al guardar la información');
          console.error(err);
        }
      });
    } else {
      this.privateAppService.crear('organizaciones', datos).subscribe({
        next: () => {
          this.formularioOrganizacion.reset();
          this.appService.alertaExito('OK', 'Se ha guardado la informacion correctamente').then(() => {
            this.router.navigateByUrl('/app/administrar-organizaciones/listado');
          });
        },
        error: err => {
          this.appService.alertaError('ERROR', 'Error al guardar la información');
          console.error(err);
        }
      });
    }
  }

  private obtenerOrganizacion(): void {
    const organizacion_id = this.formularioOrganizacion.get('id')?.value;
    this.privateAppService.obtener(`organizaciones/${organizacion_id}`).subscribe({
      next: res => {
        const organizacion: Organizacion = res.data;
        this.formularioOrganizacion.patchValue(organizacion);
      },
      error: err => {
        this.appService.alertaError('ERROR', 'Error al obtener la organización');
        console.error(err);
      }
    });
  }

  public redireccionar(ruta: string): void {
    this.router.navigateByUrl(`/app/administrar-organizaciones/${ruta}`)
  }
}
