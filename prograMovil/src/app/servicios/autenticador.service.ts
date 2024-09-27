import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutenticadorService {

  connnectionStatus: boolean = false;
  
  constructor() { }

  login(user: String, pass: String): boolean {
    if (user == "pepe" && pass == "pass") {
      this.connnectionStatus = true;
      return true;
    }
    this.connnectionStatus = false;
    return false
  }

  logout() {
    this.connnectionStatus = false;
  }

  isConected() {
    return this.connnectionStatus;
  }
}
