import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  /*obj para el usuario */
  user = {
    username: '',
    password: '',
  };

  mensaje = '';
  spinner = false;

  loginvalido = false;

  constructor(private router: Router, private animationController: AnimationController) {
  }

  validarLogin() {
    if (this.user.username.length != 0) {
      if (this.user.password.length != 0) {
        this.mensaje = 'Acceso concedido';
        let navigationExtras: NavigationExtras = {
          state: {
            username: this.user.username,
            password: this.user.password,
          },
        };
        this.router.navigate(['bienvenida'], navigationExtras);
      } else {
        console.log('Contraseña invalida');
        this.mensaje = 'Contraseña invalida';
        //No funciona
      }
    } else {
      console.log('Usuario invalido');
      this.mensaje = 'Usuario invalido';

    }
  }
}

