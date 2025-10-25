import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interfaces del Login (mismas del componente)
export interface LoginRequest {
  codigoInstitucional: string;
  contrasena: string;
}

export interface LoginResponse {
  id: number;
  codigoInstitucional: string;
  nombre: string;
  apellido: string;
  correoInstitucional: string;
  tipo: string;
  estado: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl = 'http://localhost:8080/api/perfil/login';

  constructor(private http: HttpClient) {}

  login(data: LoginRequest): Observable<LoginResponse> {
    console.log('POST_LOGIN');
    return this.http.post<LoginResponse>(this.loginUrl, data);
  }
}
