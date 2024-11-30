import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BienvenidaPage } from './bienvenida.page';
import { ModalController } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';


describe('BienvenidaPage', () => {
  let component: BienvenidaPage;
  let fixture: ComponentFixture<BienvenidaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BienvenidaPage],
      imports: [IonicModule.forRoot()],
      providers: [ModalController],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents;

    fixture = TestBed.createComponent(BienvenidaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the header title', () => {
    const element: HTMLElement = fixture.nativeElement;
    const title = element.querySelector('ion-header ion-title')?.textContent;
    expect(title).toContain('Registra tu asistencia');
  });

  it('should render the welcome message with username', () => {
    component.username = 'Juan Pérez';
    fixture.detectChanges(); 
    const element: HTMLElement = fixture.nativeElement;
    const welcomeMessage = element.querySelector('.welcome-section h2')?.textContent;
    expect(welcomeMessage).toContain('Bienvenido/a, Juan Pérez');
  });

  it('should render a button to scan QR code', () => {
    const element: HTMLElement = fixture.nativeElement;
    const button = element.querySelector('ion-button.scanner-button:first-child')?.textContent;
    expect(button).toContain('Escanear Código QR');
  });

  it('should display the scan result when available', () => {
    component.scanResult = 'Resultado de prueba'; // Simula un resultado del escáner
    fixture.detectChanges(); // Actualiza el DOM
    const element: HTMLElement = fixture.nativeElement;
    const scanResult = element.querySelector('.result-section .result-content')?.textContent;
    expect(scanResult).toContain('Resultado de prueba');
  });
});
