export interface Calificacion {
    id: number;
    pre_professional_practice_id: number;
    user_id: number;
    nota_promedio: number;
    porcentaje_asistencia: number;
    observaciones: string;
    recomendaciones: string;
    created_at: Date;
    updated_at: Date;
}