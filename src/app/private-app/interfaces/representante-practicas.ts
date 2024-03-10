import { Organizacion } from './organizacion';
import { User } from './user';
import { Usuario } from './usuario';

export interface RepresentantePracticas {
  id: number;
  user_id: number;
  organizacion_id: number;
  funcion_laboral: string;
  telefono: string;
  organization?: Organizacion;
  user: User;
  created_at: Date;
  updated_at: Date;
}
