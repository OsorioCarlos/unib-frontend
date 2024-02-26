import { Component } from '@angular/core';
import { AuthUser } from 'src/app/private-app/interfaces/auth-user';
import { Calificacione, Director, Organizacion2, ResumenEstudiante } from 'src/app/private-app/interfaces/resumen-estudiante';
import { PrivateAppService } from 'src/app/private-app/services/private-app.service';

@Component({
  selector: 'app-resumen-practica',
  templateUrl: './resumen-practica.component.html',
  styleUrls: ['./resumen-practica.component.css']
})
export class ResumenPracticaComponent {
  authUser : AuthUser;
  resumen : ResumenEstudiante;

  calificacionesOrganizacion!:Calificacione[];
  constructor(private privateAppService: PrivateAppService ) { 
    this.authUser = {
      cedula: '',
      nombre: '',
      tipo_usuario: '',
    };
  
    this.resumen = {
      estudiante: {
        nombre: '',
        identificacion: '',
        email: '',
        carrera: '',
        nivel: '',
        areaPropuesta: '',
        horasSolicitadas: 0
      },
      organizacion: {
        razonSocial: '',
        representanteLegal: '',
        areaDedicacion: '',
        direccion: '',
        telefono: '',
        email: '',
        diasHabiles: '',
        horario: ''
      },
      representante: {
        nombre: '',
        funcion: '',
        identificacion: '',
        email: '',
        telefono: ''
      },
      practica: {
        areaPractica: '',
        objetivos: '',
        tareas: '',
        fechaInicio: '',
        fechaFin: '',
        diasLaborables: '',
        horario: ''
      },
      informe: {
        cumplimientosObjetivos: '',
        beneficios: '',
        aprendizajes: '',
        desarrolloPersonal: '',
        comentarios: '',
        recomendaciones: ''
      }
    }
    this.obtenerInfoUsuario();
  }

  ngOnInit(): void {
  }

  obtenerInfoEstudiante(){
    this.privateAppService.obtener(`estudiantes/obtenerInfoEstudiante/${this.authUser.cedula}`).subscribe(
      res=>{
        this.resumen = res.data;
      },
      err=>{
        console.error(err);
      }
    );
  }

  obtenerInfoUsuario(){
    this.privateAppService.obtener('auth/authUser').subscribe(
      (res) => {
        this.authUser = res.data;
        this.obtenerInfoEstudiante();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}

  
