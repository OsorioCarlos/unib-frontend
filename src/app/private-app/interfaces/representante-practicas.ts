import { Organizacion } from "./organizacion";
import { Usuario } from "./usuario";

export interface RepresentantePracticas {
    id: number;
    user_id: number;
    organization?: Organizacion
    user?: Usuario;
    created_at: Date;
    updated_at: Date;
}