import { Catalogo } from "./catalogo";
import { Usuario } from "./usuario";

export interface DirectorCarrera {
    id: number;
    user_id: number;
    user?: Usuario;
    carrera_catalogo?: Catalogo;
    carrera_id: number;
    created_at: Date;
    updated_at: Date;
}
