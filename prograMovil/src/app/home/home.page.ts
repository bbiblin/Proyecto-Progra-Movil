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
  ) { }

  validar() {
    this.auth
      .loginDB(this.user.username, this.user.password)
      .then((res) => {
        this.mensaje = 'Conexion exitosa';
        let navigationExtras: NavigationExtras = {
          state: {
            username: this.user.username,
            password: this.user.password,
          },
        };
        setTimeout(() => {
          this.router.navigate(['/perfil'], navigationExtras);
          this.mensaje = '';
        }, 3000);
      })
      .catch((error) => {
        this.mensaje = 'Error en las credenciales';
      });
  }

  /*
  validarLogin() {
    if (this.auth.login(this.user.username, this.user.password)) {
      //Funciona
      this.mensaje = 'Conexion exitosa';
      let navigationExtras: NavigationExtras = {
        state: {
          username: this.user.username,
          password: this.user.password,
        },
      };

      // setTimeout = permite generar un pequeño delay para realizar la accion

      this.router.navigate(['/bienvenida'], navigationExtras);
      this.mensaje = "";

    } else {
      this.mensaje = 'Error en las credenciales';
      //No funciona
    }
  }
  */

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
          { offset: 1, transform: 'scale(1)' }
        ]);
      buttonAnimation.play();
    } else {
      console.error('Button element not found');
    }
  }

}  