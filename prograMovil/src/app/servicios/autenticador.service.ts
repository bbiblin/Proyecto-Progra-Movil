import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class AutenticadorService {
  //apiURL = 'http://localhost:3000/users';
  apiURL1 = "https://xckfzcmm-3000.brs.devtunnels.ms/users";
  apiURL2 = "https://xckfzcmm-3000.brs.devtunnels.ms/asistencias";

  estadoConexion: boolean = false;
  private isLoggedIn = false;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<boolean> {

    return this.http.get<any[]>(this.apiURL1).pipe(
      map((users) => {
        const user = users.find(
          (u) => u.username === username && u.password === password
        );
        this.isLoggedIn = !!user; // Actualiza el estado de sesión
        return this.isLoggedIn;
      })
    );
  }

  /*
  login(user: String, pass: String): boolean {
    if (user == 'usuario1' && pass == 'pass123') {
      this.estadoConexion = true;
      return true;
    }

    this.estadoConexion = false;
    return false;
  }
  */

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  logout() {
    this.estadoConexion = false;
  }

  isConected() {
    return this.estadoConexion;
  }

  verificarUsuarioExistente(email: string): Observable<boolean> {
    return this.http.get<any[]>(this.apiURL1).pipe(
      map((users) => {
        return users.some((user) => user.email === email);
      })
    );
  }

  obtenerUsuarioPorNombre(username: string): Observable<any> {
    return this.http.get<any[]>(this.apiURL1).pipe(
      map((users) => users.find((user) => user.username === username))
    );
  }

  registro(user: any): Observable<any> {
    return this.http.post(this.apiURL1, user);
  }

  agregarAsistencia(asistencia: { username: string; idAsistencia: string }): Observable<any> {
    return this.http.post<any>(this.apiURL2, asistencia);
  }

  obtenerAsistenciasPorUsuario(username: string): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL2).pipe(
      map((asistencias) => asistencias.filter((asistencia) => asistencia.username === username))
    );
  }
}
