import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Calificacion } from '../Model/calificaciones-model';

@Injectable({
  providedIn: 'root'
})
export class CalificacionesService {

  private apiUrl = 'http://localhost:8080/api/calificaciones'; // Cambia la URL si tu backend está en otra ruta

  constructor(private http: HttpClient) { }

  // Obtener todas las calificaciones
  getAll(): Observable<Calificacion[]> {
    return this.http.get<Calificacion[]>(this.apiUrl);
  }

  // Obtener calificaciones por estudiante
  getByEstudiante(estudianteId: number): Observable<Calificacion[]> {
    return this.http.get<Calificacion[]>(`${this.apiUrl}/estudiante/${estudianteId}`);
  }

  getById(id: number): Observable<Calificacion> {
    return this.http.get<Calificacion>(`${this.apiUrl}/${id}`);
  }
  // Crear nueva calificación
  create(calificacion: Calificacion): Observable<Calificacion> {
    return this.http.post<Calificacion>(this.apiUrl, calificacion);
  }

 update(id: number, calificacion: Calificacion): Observable<Calificacion> {
  return this.http.put<Calificacion>(`${this.apiUrl}/${id}`, calificacion);
}


  // Eliminar calificación
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
