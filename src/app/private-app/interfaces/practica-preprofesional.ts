import { Calificacion } from './calificacion';
import { Estudiante } from './estudiante';
import { Organizacion } from './organizacion';
import { RepresentantePracticas } from './representante-practicas';

export interface PracticaPreProfesional {
  id: number;
  student_id: number;
  organization_id: number;
  internship_representative_id: number;
  career_director_id: number;
  estudiante_compromiso: boolean;
  estudiante_compromiso_fecha: Date;
  nota_final: number;
  asistencia: number;
  estado_id: number;
  area_practicas: string;
  objetivos_practicas: string;
  tareas: string;
  numero_horas_practicas: number;
  fecha_inicio: Date;
  fecha_fin: Date;
  dias_laborables: string;
  horario: string;
  empresa_compromiso: boolean;
  empresa_compromiso_fecha: Date;
  cumplimiento_objetivos: string;
  beneficios: string;
  aprendizajes: string;
  desarrollo_personal: string;
  comentarios: string;
  recomendaciones: string;
  organization?: Organizacion;
  student?: Estudiante;
  internship_representative?: RepresentantePracticas;
  grades?: Calificacion[];
  created_at: Date;
  updated_at: Date;
}
