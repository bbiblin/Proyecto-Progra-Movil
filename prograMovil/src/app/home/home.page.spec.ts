import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IonicStorageModule } from '@ionic/storage-angular';

import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [
        IonicModule.forRoot(),
        IonicStorageModule.forRoot(),
        HttpClientTestingModule, 
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title', () => {
    const comp = fixture.nativeElement as HTMLElement;
    expect(comp.querySelector('ion-list ion-title h1')?.textContent).toContain(
      'Inicia sesión con tus credenciales'
    );
  });

  it('should have a button with text "Ingresar"', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('ion-button');
    expect(button?.textContent).toContain('Ingresar');
  });

  
});
