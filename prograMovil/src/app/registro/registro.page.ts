import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ToastController } from '@ionic/angular';
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


  constructor(private router: Router, private auth: AutenticadorService, private toastController: ToastController) {}

  ngOnInit(){}


  async validarRegistro() {
    this.auth
      .registro(this.user)
      .then((res) => {
        this.router.navigate(['/bienvenida']);
        return this.toastController.create({
          message: 'Registrado con éxito',
          duration: 5000,
          position: 'bottom',
        })
      })
      .then((toast) => toast.present())
      .catch((error) => {
        return this.toastController
        .create({
          message: 'Error al registrar',
          duration: 5000,
          position: 'bottom',
        })
        .then ((toast) => toast.present());
      });
  }
}

