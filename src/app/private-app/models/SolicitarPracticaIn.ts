export interface SolicitarPracticaIn {
  usuarioId: string;
  nivelId: number;
  carreraId: number;
  practicaPreprofesional: PracticaPreprofesional;
}

export interface PracticaPreprofesional {
  area: string;
  numeroHoras: number;
  estudianteCompromiso: boolean;
}
