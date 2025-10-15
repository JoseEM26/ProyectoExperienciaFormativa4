export class Usuario {
  id?: number;  // Opcional, ya que normalmente es generado por el backend

  codigoInstitucional!: string;
  sede!: string;
  nombre!: string;
  apellido!: string;
  correoInstitucional!: string;
  tipo!: string;
  estado: boolean = true;

  constructor(init?: Partial<Usuario>) {
    Object.assign(this, init);
  }
}
