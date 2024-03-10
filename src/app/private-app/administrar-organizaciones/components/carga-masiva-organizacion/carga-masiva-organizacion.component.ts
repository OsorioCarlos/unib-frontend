import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { PrivateAppService } from 'src/app/private-app/services/private-app.service';
import { AppService } from 'src/app/services/app.service';

import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-carga-masiva-organizacion',
  templateUrl: './carga-masiva-organizacion.component.html',
  styleUrls: ['./carga-masiva-organizacion.component.css']
})
export class CargaMasivaOrganizacionComponent {

  public formularioCargaMasiva: FormGroup;
  public archivo: File | null;
  public apiUrl: string = environment.apiUrl;

  constructor(
    private privateAppService: PrivateAppService,
    private fb: FormBuilder,
    private appService: AppService,
    private router: Router
  ) {
    this.archivo = null;
    this.formularioCargaMasiva = this.fb.group({
      tipo_carga: ['organizacion', Validators.required]
    });
  }

  public seleccionarArchivo(event: any): void {
    this.archivo = event.target.files[0];
  }

  public cargarArchivo(): void {
    if (this.archivo) {
      const formData =  new FormData();
      formData.append('archivo', this.archivo);
      formData.append('tipo', this.formularioCargaMasiva.get('tipo_carga')?.value);

      this.privateAppService.crear('carga_masiva', formData).subscribe({
        next: res => {
          const estado: string =  res.mensaje;
          const mensaje: string = res.data;
          if (estado === 'OK') {
            this.appService.alertaExito('OK', mensaje);
          } else {
            this.appService.alertaError('ERROR', mensaje);
          }
        },
        error: err => {
          this.appService.alertaError('ERROR', 'Error al cargar el archivo');
          console.error(err);
        }
      });
    } else {
      this.appService.alertaAviso('SIN ARCHIVO', 'No se ha seleccionado un archivo para cargar');
    }
  }

  public descargarFormato(): void {
    const tipo = this.formularioCargaMasiva.get('tipo_carga')?.value;
    this.privateAppService.obtener(`carga_masiva?tipo=${tipo}`).subscribe({
      next: res => {
        window.open(`${this.apiUrl}/${res.data}`, '_blank');
      },
      error: err => {
        this.appService.alertaError('ERROR', 'Error al descargar el formato de carga');
        console.error(err);
      }
    });
  }

  public redireccionar(ruta: string): void {
    this.router.navigateByUrl(`/app/administrar-organizaciones/${ruta}`)
  }
  
}
