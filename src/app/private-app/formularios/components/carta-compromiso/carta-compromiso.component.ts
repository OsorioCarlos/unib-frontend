import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthUser } from 'src/app/private-app/interfaces/auth-user';
import { PrivateAppService } from 'src/app/private-app/services/private-app.service';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-carta-compromiso',
  templateUrl: './carta-compromiso.component.html',
  styleUrls: ['./carta-compromiso.component.css'],
})
export class CartaCompromisoComponent {
  formularioCartaCompromiso: FormGroup;
  fechaActualTexto: string;
  meses: string[];
  niveles: any;

  constructor(private fb: FormBuilder, private privateAppService: PrivateAppService, private appService: AppService) {
    this.formularioCartaCompromiso = this.fb.group({
      cedula_estudiante: ['', Validators.required],
      nombre_estudiante: ['', Validators.required],
      carrera: ['', Validators.required],
      semestre: ['', Validators.required],
      empresa: ['', Validators.required]
    });

    this.meses = [
      'enero',
      'febrero',
      'marzo',
      'abril',
      'mayo',
      'junio',
      'julio',
      'agosto',
      'septiembre',
      'octubre',
      'noviembre',
      'diciembre'
    ];

    this.niveles = {
      'PRIMER NIVEL': '1',
      'SEGUNDO NIVEL': '2',
      'TERCER NIVEL': '3',
      'CUARTO NIVEL': '4',
      'QUINTO NIVEL': '5',
      'SEXTO NIVEL': '6',
      'SEPTIMO NIVEL': '7',
      'OCTAVO NIVEL': '8',
      'NOVENO NIVEL': '9',
      'DÉCIMO NIVEL': '10'
    };
    this.fechaActualTexto = this.devolverFechaTexto();
    this.completarCartaComprmiso();
  }

  public generarCartaCompromiso(): void {
    if (this.formularioCartaCompromiso.valid) {
      const datos = this.formularioCartaCompromiso.value;
      console.log('DATOS', datos);
      console.log('Fecha', this.fechaActualTexto);
    } else {
      this.appService.alertaError('ERROR', 'Falta información en la carta de compromiso');
    }
  }

  private completarCartaComprmiso(): void {
    this.privateAppService.obtener('auth/authUser').subscribe(res => {
      const authUser: AuthUser = res.data;
      if (authUser.tipo_usuario === 'ESTUDIANTE') {
        this.formularioCartaCompromiso.setValue({
          cedula_estudiante: authUser.cedula,
          nombre_estudiante: `${authUser.nombres} ${authUser.apellidos}`,
          carrera: authUser.carrera,
          semestre: this.niveles[authUser.nivel],
          empresa: authUser.empresa
        });
      } else {
        this.appService.alertaError('ERROR', 'Error al completar la información');
      }
    }, error => {
      this.appService.alertaError('ERROR', 'Error al completar la información');
      console.error(error);
    });
  }

  private devolverFechaTexto(): string {
    const fechaActual = new Date();
    return `${fechaActual.getDay()} de ${this.meses[fechaActual.getMonth()]} del ${fechaActual.getFullYear()}`;
  }
}
