import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';

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

  constructor(private router: Router, private animationController: AnimationController) {
  }

  validarLogin() {
    if (this.user.username.length != 0) {
      if (this.user.username.length <= 8) {
        if (this.user.password.length >= 8) {
          this.mensaje = 'Acceso concedido';
          let navigationExtras: NavigationExtras = {
            state: {
              username: this.user.username,
              password: this.user.password,
            },
          };
          this.router.navigate(['bienvenida'], navigationExtras);
        } else {
          console.log('Contraseña inválida, debe tener al menos 8 caracteres');
          this.mensaje = 'Contraseña inválida, debe tener al menos 8 caracteres';
        }
      } else {
        console.log('Usuario inválido, debe tener un máximo de 8 caracteres');
        this.mensaje = 'Usuario inválido, debe tener un máximo de 8 caracteres';
      }
    } else {
      console.log('Usuario inválido');
      this.mensaje = 'Usuario inválido';
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
          { offset: 1, transform: 'scale(1)' } 
        ]);
      buttonAnimation.play();
    } else {
      console.error('Button element not found');
    }
  }

}  