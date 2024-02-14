import { RepresentantePracticas } from './representante-practicas';

export interface Organizacion {
  id: number;
  razon_social: string;
  representante_legal: string;
  direccion: string;
  telefono: string;
  email: string;
  area_dedicacion: string;
  horario: string;
  dias_laborables: string;
  created_at: Date;
  updated_at: Date;
  internship_representatives: RepresentantePracticas[];
}
