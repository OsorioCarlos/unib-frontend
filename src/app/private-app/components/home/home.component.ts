import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import Swal from 'sweetalert2';
import { User } from '../../interfaces/user';
import { PrivateAppService } from '../../services/private-app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  agregarUsuarioForm!: FormGroup;
  listaUsuarios!: User[];
  constructor(
    private fb: FormBuilder,
    private privateAppService: PrivateAppService,
    private appService: AppService,
    private router: Router
  ) {}
  @ViewChild('btnCerrarModalCrear') btnCerrarModalCrear: any;

  ngOnInit(): void {
    // Inicializar el formulario con validadores
    this.agregarUsuarioForm = this.fb.group({
      identificacion: ['', Validators.required],
      nombreCompleto: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      tipoUsuario: ['', Validators.required],
    });

    this.consultarUsuarios();
  }

  // Método para agregar un usuario
  agregarUsuario() {
    if (this.agregarUsuarioForm.valid) {
      // Obtener los valores del formulario
      const usuarioNuevo = this.agregarUsuarioForm.value;

      // Llamar al servicio para agregar el usuario
      this.privateAppService
        .crear('admin/crearUsuario', usuarioNuevo)
        .subscribe(
          (usuarioAgregado) => {
            // Puedes realizar acciones adicionales después de agregar el usuario si es necesario
            // Cerrar el modal
            this.agregarUsuarioForm.reset();
            Swal.fire({
              title: 'Ok!',
              text: usuarioAgregado.mensaje,
              icon: 'success',
              showConfirmButton: false,
              timer: 1500,
            }).then(() => {
              window.location.reload();
            });
          },
          (error) => {
            console.error('Error al agregar usuario:', error);
            // Manejar errores si es necesario
          }
        );
    } else {
      // Marcar campos del formulario como tocados para mostrar errores
      this.marcarCamposComoTocados();
    }
  }

  marcarCamposComoTocados() {
    Object.values(this.agregarUsuarioForm.controls).forEach((control) => {
      control.markAsTouched();
    });
  }

  // Método para consultar usuarios
  consultarUsuarios() {
    // Llamar al servicio para obtener la lista de usuarios
    this.privateAppService.obtener('admin/consultarUsuarios').subscribe(
      (usuarios) => {
        this.listaUsuarios = usuarios.data;
        console.log('Usuarios consultados correctamente:', this.listaUsuarios);
      },
      (error) => {
        console.error('Error al consultar usuarios:', error);
        // Manejar errores si es necesario
      }
    );
  }

  // Método para recargar la página
  cerrarModal() {
    if (this.btnCerrarModalCrear) {
      this.btnCerrarModalCrear.nativeElement.click();
    }
  }
}
