import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroPage } from './registro.page';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { provideHttpClient } from '@angular/common/http';

describe('RegistroPage', () => {
  let component: RegistroPage;
  let fixture: ComponentFixture<RegistroPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroPage],
      imports: [IonicModule.forRoot(), IonicStorageModule.forRoot()],
      providers: [provideHttpClient()]
    }).compileComponents();
    fixture = TestBed.createComponent(RegistroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the header with logo', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const logo = compiled.querySelector('img');
    expect(logo?.src).toContain('assets/img/Logo_DuocUC.svg.png');
  });

  it('should display the username input field with placeholder "Ingrese su usuario"', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const input = compiled.querySelector('ion-input[placeholder="Ingrese su usuario"]');
    expect(input).toBeTruthy();
  });

  it('should display the email input field with placeholder "Ingrese su correo"', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const input = compiled.querySelector('ion-input[placeholder="Ingrese su correo"]');
    expect(input).toBeTruthy();
  });

  
});