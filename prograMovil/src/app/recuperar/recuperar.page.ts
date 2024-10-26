import { Component } from '@angular/core';
import { AutenticadorService } from '../servicios/autenticador.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage {
  username = '';
  mensaje = '';
  password: string | null = null;

  constructor(private auth: AutenticadorService, private router: Router) {}

  recuperarContrasena() {
    this.mensaje = '';
    this.password = null;

    if (!this.username) {
      this.mensaje = 'Por favor, ingrese un nombre de usuario';
      return;
    }

    this.auth.obtenerUsuarioPorNombre(this.username).subscribe(
      (usuario) => {
        if (usuario) {
          this.password = usuario.password;
        } else {
          this.mensaje = 'Usuario no encontrado';
        }
      },
      (error) => {
        console.log('Error al recuperar el usuario:', error);
        this.mensaje = 'Error en el sistema. Inténtelo más tarde.';
      }
    );
  }

  volverAlInicio() {
    this.router.navigate(['/home']);
  }
}
