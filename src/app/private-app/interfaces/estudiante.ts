import { Catalogo } from "./catalogo";
import { Usuario } from "./usuario";

export interface Estudiante {
    id: number;
    user_id: number;
    carrera_id: number;
    nivel_id: number;
    user?: Usuario;
    carrera_catalogo?: Catalogo;
    nivel_catalogo?: Catalogo;
    created_at: Date;
    updated_at: Date;
}
