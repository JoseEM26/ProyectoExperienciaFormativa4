export class Calificacion {
  id?: number;

  estudiante!: {
    id: number;
    nombre: string;
    apellido: string;
    correoInstitucional?: string;
  };
  asignatura!: {
    id: number;
    codigoAsignatura: string;
    nombre: string;
  };
  evaluacion!: 'Parcial' | 'Final';
  nota!: number;
  fechaRegistro?: string;

  constructor(init?: Partial<Calificacion>) {
    Object.assign(this, init);
  }
}
