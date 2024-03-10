import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthUser } from 'src/app/private-app/interfaces/auth-user';
import { ResumenEstudiante } from 'src/app/private-app/interfaces/resumen-estudiante';
import { PrivateAppService } from 'src/app/private-app/services/private-app.service';

@Component({
  selector: 'app-resumen-practica',
  templateUrl: './resumen-practica.component.html',
  styleUrls: ['./resumen-practica.component.css']
})
export class ResumenPracticaComponent {
  authUser : AuthUser;
  resumen : ResumenEstudiante;
  identificacionEstudiante: string;
  id: string | null;
  constructor(private privateAppService: PrivateAppService, private route: ActivatedRoute,
    private router: Router ) { 
    this.authUser = {
      cedula: '',
      nombre: '',
      tipo_usuario: '',
    };
    this.identificacionEstudiante = '';
    this.id = '';
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

  ngOnInit() {
    
  }

  obtenerInfoEstudiante(){
    this.route.paramMap.subscribe((params) => {
      this.identificacionEstudiante = params.get('id') ?? this.authUser.cedula;
      this.id = params.get('id');
    });
    this.privateAppService.obtener(`practicas_preprofesionales/${this.id}`).subscribe(
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

  
