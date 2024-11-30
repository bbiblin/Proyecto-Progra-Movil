import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecuperarPage } from './recuperar.page';
import { IonicModule } from '@ionic/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IonicStorageModule } from '@ionic/storage-angular';

describe('RecuperarPage', () => {
  let component: RecuperarPage;
  let fixture: ComponentFixture<RecuperarPage>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [RecuperarPage],
      imports:  [
        IonicModule.forRoot(),
        IonicStorageModule.forRoot(),
        HttpClientTestingModule, 
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RecuperarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title "¿Olvidaste tu contraseña?"', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('¿Olvidaste tu contraseña?');
  });


  it('should display the input field with placeholder "Ingrese su usuario"', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const input = compiled.querySelector('ion-input[placeholder="Ingrese su usuario"]');
    expect(input).toBeTruthy();
  });

  it('should show the password if the "password" variable is set', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    component.password = 'miContraseñaSecreta';
    fixture.detectChanges();
    expect(compiled.querySelector('div')?.textContent).toContain('Su contraseña es: miContraseñaSecreta');
  });
});
