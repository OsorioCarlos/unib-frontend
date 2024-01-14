import { Usuario } from "./usuario";

export interface Estudiante {
    id: number;
    user_id: number;
    carrera_id: number;
    nivel_id: number;
    user?: Usuario;
    created_at: Date;
    updated_at: Date;
}