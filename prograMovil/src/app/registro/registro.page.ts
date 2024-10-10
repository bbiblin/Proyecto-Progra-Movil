import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationExtras} from '@angular/router';
import { AutenticadorService } from 'src/app/servicios/autenticador.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage{
  user = {
    username: '',
    email: '',
    password: '',
  };

  mensaje = '';

  constructor(private router: Router, private auth: AutenticadorService) {}


    validarRegistro() {
      if (this.auth.registro(this.user.username, this.user.email, this.user.password)) {
        //Funciona
        this.mensaje = 'Conexion exitosa';
        let navigationExtras: NavigationExtras = {
          state: {
            username: this.user.username,
            email: this.user.email,
            password: this.user.password,
          },
        };
        
        this.router.navigate(['/bienvenida'], navigationExtras);
        this.mensaje = "";
  
      } else {
        this.mensaje = 'Error en las credenciales';
      }
  }
}

