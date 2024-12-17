import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal, LoadingController, ModalController, Platform, ToastController } from '@ionic/angular';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { BarcodeScanner, LensFacing } from '@capacitor-mlkit/barcode-scanning';
import { AutenticadorService } from '../servicios/autenticador.service';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.page.html',
  styleUrls: ['./bienvenida.page.scss'],
})
export class BienvenidaPage implements OnInit {

  username: string = '';

  scanResult: string = '';

  constructor(
    private loadingController: LoadingController,
    private platform: Platform,
    private router: Router,
    private modalController: ModalController,
    private authService: AutenticadorService, 
    private toastController: ToastController 
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.username = navigation.extras.state['username'];
    }
  }

  async registrarAsistencia() {
    if (!this.scanResult) {
      this.mostrarToast('Por favor escanea un código QR antes de registrar la asistencia.');
      return;
    }

    const asistencia = {
      username: this.username,
      idAsistencia: this.scanResult,
    };

    const loading = await this.loadingController.create({
      message: 'Registrando asistencia...',
    });
    await loading.present();

    this.authService.agregarAsistencia(asistencia).subscribe({
      next: async () => {
        await loading.dismiss();
        this.mostrarToast('Asistencia registrada correctamente.');
        this.scanResult = '';
      },
      error: async (err) => {
        console.error('Error al registrar asistencia:', err);
        await loading.dismiss();
        this.mostrarToast('Error al registrar la asistencia. Inténtalo de nuevo.');
      },
    });
  }

  ngOnInit(): void {

    if (this.platform.is('capacitor')) {
      BarcodeScanner.isSupported().then();
      BarcodeScanner.checkPermissions().then();
      BarcodeScanner.removeAllListeners();
    }

  }

  async openBarcodeScanner() {
    const modal = await this.modalController.create({
      component: BarcodeScanningModalComponent,
      cssClass: 'barcode-scanning-modal',
      showBackdrop: false,
      componentProps: {
        formats: ['QR_CODE'],
        LensFacing: LensFacing.Back
      },
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();

    if (data) {
      this.scanResult = data?.barcode?.displayValue;
    }
  }

  enviarEmail() {
    const email = 'ejemplo@email.com';
    const subject = 'Asistencia a clases';
    const body = encodeURIComponent(this.scanResult);

    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${body}`;

    window.location.href = mailtoUrl;
  }

  async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'top',
    });
    toast.present();
  }
}
