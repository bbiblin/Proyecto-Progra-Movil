import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import { AutenticadorService } from '../servicios/autenticador.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  ngAfterContentInit() {
    this.animarboton();
  }

  /*obj para el usuario */
  user = {
    username: '',
    password: '',
  };

  mensaje = '';
  spinner = false;

  loginvalido = false;

  constructor(
    private router: Router,
    private animationController: AnimationController,
    private auth: AutenticadorService
  ) {}

  validar() {
    if (!this.user.username || !this.user.password) {
      this.mensaje = 'Por favor ingrese su usuario y contraseña';
      return; // Salimos de la función si hay campos vacíos
    }

    // Intentar el login solo si los campos están completos
    if (this.auth.login(this.user.username, this.user.password)) {
      // Si el login es exitoso
      this.mensaje = 'Conexión exitosa';
      let navigationExtras: NavigationExtras = {
        state: {
          username: this.user.username,
          password: this.user.password,
        },
      };

      this.router.navigate(['/bienvenida'], navigationExtras);
      this.mensaje = '';
    } else {
      // Si el login falla
      this.mensaje = 'Error en las credenciales';
    }
  }

  animarboton() {
    const button = document.querySelector('#boton');
    if (button) {
      const buttonAnimation = this.animationController
        .create()
        .addElement(button)
        .duration(2000)
        .iterations(Infinity)
        .keyframes([
          { offset: 0, transform: 'scale(1)' },
          { offset: 0.5, transform: 'scale(1.1)' },
          { offset: 1, transform: 'scale(1)' },
        ]);
      buttonAnimation.play();
    } else {
      console.error('Button element not found');
    }
  }
}
