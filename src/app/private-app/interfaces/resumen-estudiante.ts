export interface ResumenEstudiante {
    estudiante: Estudiante
    organizacion: Organizacion
    representante: Representante
    practica: Practica
    informe: Informe
    valoracion?: Valoracion
  }
  
  export interface Estudiante {
    nombre: string
    identificacion: string
    email: string
    carrera: string
    nivel: string
    areaPropuesta: string
    horasSolicitadas: number
  }
  
  export interface Organizacion {
    razonSocial: string
    representanteLegal: string
    areaDedicacion: string
    direccion: string
    telefono: string
    email: string
    diasHabiles: string
    horario: string
  }
  
  export interface Representante {
    nombre: string
    funcion: string
    identificacion: string
    email: string
    telefono: string
  }
  
  export interface Practica {
    areaPractica: string
    objetivos: string
    tareas: string
    fechaInicio: string
    fechaFin: string
    diasLaborables: string
    horario: string
  }
  
  export interface Informe {
    cumplimientosObjetivos: string
    beneficios: string
    aprendizajes: string
    desarrolloPersonal: string
    comentarios: string
    recomendaciones: string
  }
  
  export interface Valoracion {
    organizacion: Organizacion2
    director: Director
    promedio: Promedio
  }
  
  export interface Organizacion2 {
    calificaciones: Calificacione[]
    asistencia: number
    observaciones: string
    recomendaciones: string
    nota: number
  }
  
  export interface Calificacione {
    criterio: string
    calificacion: number
  }
  
  export interface Director {
    calificaciones: Calificacione2[]
    asistencia: number
    observaciones: any
    nota: number
  }
  
  export interface Calificacione2 {
    criterio: string
    calificacion: number
  }
  
  export interface Promedio {
    horasAprobadas: any
    promedio: number
    asistencia: number
  }
  