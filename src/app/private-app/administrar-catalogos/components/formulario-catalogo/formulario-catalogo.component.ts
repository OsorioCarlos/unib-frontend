import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Catalogo } from 'src/app/private-app/interfaces/catalogo';
import { Recurso } from 'src/app/private-app/interfaces/recurso';
import { Usuario } from 'src/app/private-app/interfaces/usuario';

import { PrivateAppService } from 'src/app/private-app/services/private-app.service';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-formulario-catalogo',
  templateUrl: './formulario-catalogo.component.html',
  styleUrls: ['./formulario-catalogo.component.css']
})
export class FormularioCatalogoComponent {

  formularioRecurso: FormGroup;

  constructor(
    private fb: FormBuilder,
    private privateAppService: PrivateAppService,
    private appService: AppService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.formularioRecurso = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      catalogos: this.fb.array([], Validators.required)
    });

    this.activatedRoute.params.subscribe((params: Params) => {
      this.formularioRecurso.get('id')?.setValue(params['id']);
    });

    if (this.formularioRecurso.get('id')?.value) {
      this.obtenerRecurso();
    } else {
      this.agregarCatalogoControl();
    }
  }

  public covertirAbstractControlEnFormArray(abstractControl: AbstractControl | null): FormArray {
    return abstractControl as FormArray;
  }

  public covertirAbstractControlEnFormGroup(abstractControl: AbstractControl | null): FormGroup {
    return abstractControl as FormGroup;
  }

  public eliminarCatalogoControl(index: number): void {
    this.covertirAbstractControlEnFormArray(this.formularioRecurso.get('catalogos')).removeAt(index);
  }

  public agregarCatalogoControl(): void {
    this.covertirAbstractControlEnFormArray(this.formularioRecurso.get('catalogos')).push(
      this.fb.group({
        id: [''],
        nombre: ['', Validators.required]
      })
    );
  }

  public guardarInformacion(): void {
    const datos = {
      recurso: this.formularioRecurso.value
    };

    if (this.formularioRecurso.get('id')?.value) {
      this.privateAppService.actualizar('recursos', this.formularioRecurso.get('id')?.value, datos).subscribe({
        next: () => {
          this.formularioRecurso.reset();
          this.appService.alertaExito('OK', 'Se ha guardado la informacion correctamente').then(() => {
            this.router.navigateByUrl('/app/administrar-catalogos/listado');
          });
        },
        error: err => {
          this.appService.alertaError('ERROR', 'Error al guardar la información');
          console.error(err);
        }
      });
    } else {
      this.privateAppService.crear('recursos', datos).subscribe({
        next: () => {
          this.formularioRecurso.reset();
          this.appService.alertaExito('OK', 'Se ha guardado la informacion correctamente').then(() => {
            this.router.navigateByUrl('/app/administrar-catalogos/listado');
          });
        },
        error: err => {
          this.appService.alertaError('ERROR', 'Error al guardar la información');
          console.error(err);
        }
      });
    }
  }

  private obtenerRecurso(): void {
    const recurso_id = this.formularioRecurso.get('id')?.value;
    this.privateAppService.obtener(`recursos/${recurso_id}`).subscribe({
      next: res => {
        const recurso: Recurso = res.data;
        recurso.catalogues?.forEach(c => {
          this.agregarCatalogoControl();
        });
        this.formularioRecurso.get('nombre')?.setValue(recurso.nombre);
        this.formularioRecurso.get('catalogos')?.patchValue(recurso.catalogues);
      },
      error: err => {
        this.appService.alertaError('ERROR', 'Error al obtener el recurso');
        console.error(err);
      }
    });
  }

  public redireccionar(ruta: string): void {
    this.router.navigateByUrl(`/app/administrar-catalogos/${ruta}`)
  }
}
