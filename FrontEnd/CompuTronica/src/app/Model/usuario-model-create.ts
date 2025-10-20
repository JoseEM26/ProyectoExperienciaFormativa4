export class UsuarioCreate {
  id?: number;  // Opcional, ya que normalmente es generado por el backend

  codigoInstitucional!: string;
  sede!: string;
  nombre!: string;
  apellido!: string;
  contrasena!: string;
  correoInstitucional!: string;
  tipo!: string;
  estado: boolean = true;

  constructor(init?: Partial<UsuarioCreate>) {
    Object.assign(this, init);
  }
}
