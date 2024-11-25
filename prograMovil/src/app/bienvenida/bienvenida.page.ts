import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal, LoadingController, ModalController, Platform } from '@ionic/angular';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { BarcodeScanner, LensFacing } from '@capacitor-mlkit/barcode-scanning';

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
    private modalController: ModalController
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.username = navigation.extras.state['username'];
    }
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


}
