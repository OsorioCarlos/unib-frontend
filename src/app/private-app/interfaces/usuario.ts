import { Estudiante } from "./estudiante";
import { DirectorCarrera } from "./director-carrera";
import { RepresentantePracticas } from "./representante-practicas";
import { Catalogo } from "./catalogo";

export interface Usuario {
    id: number;
    identificacion: string;
    nombre_completo: string;
    email: string;
    estado_id: number;
    tipo_id: number;
    student?: Estudiante;
    career_director?: DirectorCarrera;
    internship_representative?: RepresentantePracticas;
    estado_catalogo?: Catalogo;
    tipo_catalogo?: Catalogo;
    email_verified_at: Date;
    created_at: Date;
    updated_at: Date;
}
