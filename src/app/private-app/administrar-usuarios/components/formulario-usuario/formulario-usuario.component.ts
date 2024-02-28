import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Catalogo } from 'src/app/private-app/interfaces/catalogo';
import { Usuario } from 'src/app/private-app/interfaces/usuario';

import { PrivateAppService } from 'src/app/private-app/services/private-app.service';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-formulario-usuario',
  templateUrl: './formulario-usuario.component.html',
  styleUrls: ['./formulario-usuario.component.css']
})
export class FormularioUsuarioComponent {

  formularioUsuario: FormGroup;
  tipoUsuarioOpciones: Catalogo[];
  estadoUsuarioOpciones: Catalogo[];
  carreraOpciones: Catalogo[];
  nivelOpciones: Catalogo[];
  organizacionOpciones: Catalogo[];
  tipoUsuarioTemp: string;

  constructor(
    private fb: FormBuilder,
    private privateAppService: PrivateAppService,
    private appService: AppService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.formularioUsuario = this.fb.group({
      id: [''],
      identificacion: ['', Validators.required],
      nombre_completo: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      tipo_id: ['', Validators.required],
      estado_id: ['', Validators.required],
      carrera_id: [''],
      nivel_id: [''],
      organizacion_id: ['']
    });

    this.activatedRoute.params.subscribe((params: Params) => {
      this.formularioUsuario.get('id')?.setValue(params['id']);
    });

    if (this.formularioUsuario.get('id')?.value) {
      this.formularioUsuario.get('password')?.removeValidators(Validators.required);
      this.formularioUsuario.get('tipo_id')?.disable();
      this.obtenerUsuario();
    } else {
      this.formularioUsuario.get('estado_id')?.setValue(1);
      this.formularioUsuario.get('estado_id')?.disable();
    }

    this.tipoUsuarioOpciones = [];
    this.estadoUsuarioOpciones = [];
    this.carreraOpciones = [];
    this.nivelOpciones = [];
    this.organizacionOpciones = [];
    this.tipoUsuarioTemp = '';
  }

  ngOnInit(): void {
    this.obtenerTiposUsuarios();
    this.obtenerEstadosUsuarios();
    this.obtenerCarreras();
    this.obtenerNiveles();
  }

  public validarTipoUsuario(event: any): void {
    const valor: number = event.target.value;
    const index = this.tipoUsuarioOpciones.findIndex(opcion => opcion.id == valor);
    this.tipoUsuarioTemp = this.tipoUsuarioOpciones[index].nombre;
    if (this.tipoUsuarioTemp === 'ESTUDIANTE') {
      this.formularioUsuario.get('carrera_id')?.setValidators([Validators.required]);
      this.formularioUsuario.get('nivel_id')?.setValidators([Validators.required]);
      this.formularioUsuario.get('organizacion_id')?.removeValidators(Validators.required);
    } else if (this.tipoUsuarioTemp === 'DIRECTOR DE CARRERA') {
      this.formularioUsuario.get('carrera_id')?.setValidators([Validators.required]);
      this.formularioUsuario.get('nivel_id')?.removeValidators(Validators.required);
      this.formularioUsuario.get('organizacion_id')?.removeValidators(Validators.required);
    } else if (this.tipoUsuarioTemp === 'REPRESENTANTE PRÁCTICAS') {
      this.formularioUsuario.get('carrera_id')?.removeValidators(Validators.required);
      this.formularioUsuario.get('nivel_id')?.removeValidators(Validators.required);
      this.formularioUsuario.get('organizacion_id')?.setValidators([Validators.required]);
    } else {
      this.formularioUsuario.get('carrera_id')?.removeValidators(Validators.required);
      this.formularioUsuario.get('nivel_id')?.removeValidators(Validators.required);
      this.formularioUsuario.get('organizacion_id')?.removeValidators(Validators.required);
    }

    this.formularioUsuario.get('carrera_id')?.updateValueAndValidity();
    this.formularioUsuario.get('nivel_id')?.updateValueAndValidity();
    this.formularioUsuario.get('organizacion_id')?.updateValueAndValidity();
  }

  public validarCedulaUnica(): void {
    const cedula = this.formularioUsuario.get('identificacion')?.value;
    this.privateAppService.obtener(`usuarios/validarUsuarioDuplicado/${cedula}`).subscribe(res => {
      if (res.data == false) {
        this.appService.alertaAviso('CEDULA DUPLICADA', 'Ya existe un usuario con esta cédula');
        this.formularioUsuario.get('identificacion')?.setValue(null);
      }
    }, err => {
      this.appService.alertaError('ERROR', 'Error al validar la cédula');
      console.error(err);
    });
  }

  public guardarInformacion(): void {
    const datos = {
      usuario: this.formularioUsuario.value
    };
    if (this.formularioUsuario.get('id')?.value) {
      this.privateAppService.actualizar('usuarios', this.formularioUsuario.get('id')?.value, datos).subscribe(res => {
        this.formularioUsuario.reset();
        this.appService.alertaExito('OK', 'Se ha guardado la informacion correctamente').then(() => {
          this.router.navigateByUrl('/app/administrar-usuarios/listado');
        });
      }, err => {
        this.appService.alertaError('ERROR', 'Error al guardar la información');
        console.error(err);
      });
    } else {
      this.privateAppService.crear('usuarios', datos).subscribe(res => {
        this.formularioUsuario.reset();
        this.appService.alertaExito('OK', 'Se ha guardado la informacion correctamente').then(() => {
          this.router.navigateByUrl('/app/administrar-usuarios/listado');
        });
      }, err => {
        this.appService.alertaError('ERROR', 'Error al guardar la información');
        console.error(err);
      });
    }
  }

  private obtenerTiposUsuarios(): void {
    this.tipoUsuarioOpciones = [];
    this.privateAppService.obtener('catalogos?nombre=TIPOS USUARIO').subscribe(res => {
      this.tipoUsuarioOpciones = res.data;
    }, err => {
      this.appService.alertaError('ERROR', 'Error al obtener carreras');
      console.error(err);
    });
  }

  private obtenerEstadosUsuarios(): void {
    this.estadoUsuarioOpciones = [];
    this.privateAppService.obtener('catalogos?nombre=ESTADOS USUARIO').subscribe(res => {
      this.estadoUsuarioOpciones = res.data;
    }, err => {
      this.appService.alertaError('ERROR', 'Error al obtener carreras');
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

  private obtenerUsuario(): void {
    const usuario_id = this.formularioUsuario.get('id')?.value;
    this.privateAppService.obtener(`usuarios/${usuario_id}`).subscribe(res => {
      const usuario: Usuario = res.data;
      this.tipoUsuarioTemp = usuario.tipo_catalogo?.nombre!;
      this.formularioUsuario.patchValue({
        identificacion: usuario.identificacion,
        nombre_completo: usuario.nombre_completo,
        email: usuario.email,
        tipo_id: usuario.tipo_id,
        estado_id: usuario.estado_id
      });
      if (this.tipoUsuarioTemp === 'ESTUDIANTE') {
        this.formularioUsuario.patchValue({
          carrera_id: usuario.student?.carrera_id,
          nivel_id: usuario.student?.nivel_id
        });
      } else if (this.tipoUsuarioTemp === 'DIRECTOR DE CARRERA') {
        this.formularioUsuario.patchValue({
          carrera_id: usuario.career_director?.carrera_id
        });
      } else if (this.tipoUsuarioTemp === 'REPRESENTANTE PRÁCTICAS') {
        this.formularioUsuario.patchValue({
          organizacion_id: usuario.internship_representative?.organization?.id
        });
      } else {
        //
      }
    }, err => {
      this.appService.alertaError('ERROR', 'Error al obtener el usuario');
      console.error(err);
    });
  }
}
