export interface Organizacion {
    id: number;
    ruc: string;
    razon_social: string;
    representante_legal: string;
    direccion: string;
    telefono: string;
    area_dedicacion: string;
    horario: string;
    dias_laborales: string;
    created_at: Date;
    updated_at: Date;
}