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

    this.auth.verificarUsuarioExistente(this.user.email).subscribe(
      (usuarioExiste) => {
        if (usuarioExiste) {
          this.mensaje = 'El usuario ya existe. Intenta con otro correo electrónico.';
        } else {
          this.auth.registro(this.user).subscribe(
            () => {
              this.mensaje = 'Registro exitoso';
              let navigationExtras: NavigationExtras = {
                state: {
                  username: this.user.username,
                  email: this.user.email,
                },
              };
              this.router.navigate(['/bienvenida'], navigationExtras);
            },
            (error) => {
              console.log('Error en el proceso de registro:', error);
              this.mensaje = 'Error en el sistema. Inténtalo más tarde.';
            }
          );
        }
      },
      (error) => {
        console.log('Error en la verificación del usuario:', error);
        this.mensaje = 'Error en el sistema. Inténtalo más tarde.';
      }
    );
  }
}
