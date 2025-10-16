import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../Model/usuario-model';
import { Observable } from 'rxjs';
import { UsuarioCreate } from '../Model/usuario-model-create';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url = 'http://localhost:8080/api/perfil';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Usuario[]> {
    console.log('GET_ALL');
    return this.http.get<Usuario[]>(this.url);
  }

  getByCodigoInstitucional(codigoInstitucional: string): Observable<Usuario> {
    console.log('GET_BY_CODIGO_INSTITUCIONAL');
    return this.http.get<Usuario>(this.url + "/"+codigoInstitucional);
  }

  createUsuario(usuario: UsuarioCreate) {
    console.log('CREATE_USUARIO');
    return this.http.post<UsuarioCreate>(this.url, usuario);
  }
  cambiarEstado(id: number){
  }

getProfesores(): Observable<Usuario[]> {
  return this.http.get<Usuario[]>(`${this.url}?rol=profesor`);
}



}
