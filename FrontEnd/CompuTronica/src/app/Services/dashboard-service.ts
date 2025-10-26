import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private baseUrl = 'http://localhost:8080/api/dashboard';

  constructor(private http: HttpClient) {}

  getUsuariosPorTipo(): Observable<{ etiqueta: string; valor: number }[]> {
    return this.http.get<{ etiqueta: string; valor: number }[]>(`${this.baseUrl}/usuarios-tipo`);
  }

  getAsignaturasPorProfesor(): Observable<{ etiqueta: string; valor: number }[]> {
    return this.http.get<{ etiqueta: string; valor: number }[]>(`${this.baseUrl}/asignaturas-profesor`);
  }
  getUsuariosPorEstado(): Observable<{ etiqueta: string; valor: number }[]> {
  return this.http.get<{ etiqueta: string; valor: number }[]>(`${this.baseUrl}/usuarios-estado`);
}

getPromedioPorAsignatura(): Observable<{ etiqueta: string; valor: number }[]> {
  return this.http.get<{ etiqueta: string; valor: number }[]>(`${this.baseUrl}/promedio-asignatura`);
}

getPromedioPorEvaluacion(): Observable<{ etiqueta: string; valor: number }[]> {
  return this.http.get<{ etiqueta: string; valor: number }[]>(`${this.baseUrl}/promedio-evaluacion`);
}

getMensajesPorHora(): Observable<{ etiqueta: string; valor: number }[]> {
  return this.http.get<{ etiqueta: string; valor: number }[]>(`${this.baseUrl}/mensajes-hora`);
}

}
