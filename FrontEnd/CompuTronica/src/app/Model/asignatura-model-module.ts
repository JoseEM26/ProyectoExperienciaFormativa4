export class Asignatura {
  id?: number;  // Opcional, generado por backend
  codigoAsignatura!: string;
  nombre!: string;
  descripcion?: string;
  creditos: number = 3;
  profesor?: {
    id: number;
    nombre: string;
    apellido: string;
  correo?: string;
  };


  // Propiedad para mostrar/ocultar créditos y descripción
  showInfo: boolean = false; // <--- Esto es clave
  isEditing: boolean = false; // controla si está en modo edición

  constructor(init?: Partial<Asignatura>) {
    Object.assign(this, init);


  }
}
