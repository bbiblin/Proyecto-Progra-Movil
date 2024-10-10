import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutenticadorService {

  connnectionStatus: boolean = false;
  
  constructor() { }

  login(user: String, pass: String): boolean {
    if (user == "prueba" && pass == "prueba") {
      this.connnectionStatus = true;
      return true;
    }
    this.connnectionStatus = false;
    return false;
  }

  logout() {
    this.connnectionStatus = false;
  }

  isConected() {
    return this.connnectionStatus;
  }

    // Método para validar el registro usando credenciales fijas
    registro(username: String, email: String, password: String): boolean {
      // Validación contra valores fijos
      if (username === 'prueba' && email === 'prueba' && password === 'prueba') {
        this.connnectionStatus = true;
        return true;
      } else {
        this.connnectionStatus = false;
        return false;
      }
    }
  }