import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Asignatura } from '../Model/asignatura-model/asignatura-model-module';

@Injectable({
  providedIn: 'root'
})
export class AsignaturasService {
  private apiUrl = 'http://localhost:8080/api/asignaturas';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Asignatura[]> {
    return this.http.get<Asignatura[]>(this.apiUrl);
  }

  getById(id: number): Observable<Asignatura> {
    return this.http.get<Asignatura>(`${this.apiUrl}/${id}`);
  }

  create(asignatura: Asignatura): Observable<Asignatura> {
    return this.http.post<Asignatura>(this.apiUrl, asignatura);
  }

  update(id: number, asignatura: Asignatura): Observable<Asignatura> {
    return this.http.put<Asignatura>(`${this.apiUrl}/${id}`, asignatura);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
