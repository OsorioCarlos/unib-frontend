import { Catalogo } from "./catalogo";

export interface Recurso {
    id: number;
    nombre: string;
    catalogues?: Catalogo[];
    created_at: Date;
    updated_at: Date;
}
