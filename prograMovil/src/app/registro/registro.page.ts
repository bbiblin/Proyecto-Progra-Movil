import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AutenticadorService } from 'src/app/servicios/autenticador.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  user = {
    username: '',
    email: '',
    password: '',
  };

  mensaje = '';

  constructor(private router: Router, private auth: AutenticadorService) {}

  validarRegistro() {
    this.mensaje = '';

    if (!this.user.username || !this.user.email || !this.user.password) {
      this.mensaje = 'Todos los campos son obligatorios';
      return;
    }

    this.auth
      .registro(this.user, this.user.email, this.user.password)
      .then((success) => {
        if (success) {
          this.mensaje = 'Registro exitoso';

          let navigationExtras: NavigationExtras = {
            state: {
              username: this.user.username,
              email: this.user.email,
              password: this.user.password,
            },
          };

          this.router.navigate(['/bienvenida'], navigationExtras);
        } else {
          this.mensaje =
            'Error en las credenciales. Por favor, inténtalo de nuevo.';
        }
      })
      .catch((error) => {
        console.log('Error en el proceso de registro:', error);
        this.mensaje = 'Error en el sistema. Inténtalo más tarde.';
      });
  }
}
