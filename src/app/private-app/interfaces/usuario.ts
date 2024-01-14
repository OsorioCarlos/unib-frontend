import { Estudiante } from "./estudiante";
import { DirectorCarrera } from "./director-carrera";
import { RepresentantePracticas } from "./representante-practicas";

export interface Usuario {
    id: number;
    identificacion: string;
    primer_nombre: string;
    segundo_nombre: string;
    primer_apellido: string;
    segundo_apellido: string;
    email: string;
    estado_id: number;
    tipo_id: number;
    student?: Estudiante;
    career_director?: DirectorCarrera;
    internship_representative?: RepresentantePracticas;
    email_verified_at: Date;
    created_at: Date;
    updated_at: Date;
}