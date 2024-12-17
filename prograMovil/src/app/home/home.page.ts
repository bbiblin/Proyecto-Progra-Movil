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
    this.mensaje = '';
    
    if (!this.user.username || !this.user.password) {
      this.mensaje = 'Por favor ingrese su usuario y contraseña';
      return;
    }

    // if (this.user.username === 'admin' && this.user.password === 'admin') {
    //   this.mensaje = 'Admin';
    //   this.router.navigate(['/admin-dashboard']);
    //   return;
    // }

    this.auth.login(this.user.username, this.user.password).subscribe(
      (loginExitoso) => {
        if (loginExitoso) {
          let navigationExtras: NavigationExtras = {
            state: {
              username: this.user.username,
            },
          };
          this.router.navigate(['/bienvenida'], navigationExtras);
        } else {
          this.mensaje = 'Usuario o contraseña incorrectos';
        }
      },
      (error) => {
        console.log('Error en el proceso de inicio de sesión:', error);
        this.mensaje = 'Error en el sistema. Inténtalo más tarde.';
      }
    );
  }

  asistencias() {
    this.router.navigate(['/admin-dashboard']);
      return;
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
