import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';


@Injectable({
  providedIn: 'root',
})
export class AutenticadorService {

  estadoConexion: boolean = false;

  constructor(private storage: StorageService) {}

  loginDB(user: string, pass: String): Promise<boolean> {
    return this.storage
      .get(user)
      .then((res) => {
        if (res.password == pass) {
          this.estadoConexion = true;
          return true;
        } else {
          return false;
        }
      })
      .catch((error) => {
        console.log('Error en el sistema: ' + error);
        return false;
      });
  }
  

  login(user: String, pass: String): boolean {
    if (user == 'usuario1' && pass == 'pass123') {
      this.estadoConexion = true;
      return true;
    }

    this.estadoConexion = false;
    return false;
  }

  logout() {
    this.estadoConexion = false;
  }

  isConected() {
    return this.estadoConexion;
  }

  async registro(user: any):Promise<boolean> {
    return this.storage.set(user.username, user).then((res: any) => {
        if (res != null) {
          return true;
        } else{
          return false;
        }
      })
      .catch((error) => {
        return false;
      });
  }
}