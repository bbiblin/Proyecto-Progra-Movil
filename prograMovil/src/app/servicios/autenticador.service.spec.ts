import { TestBed } from '@angular/core/testing';

import { AutenticadorService } from './autenticador.service';
import { IonicStorageModule } from '@ionic/storage-angular';
import { provideHttpClient } from '@angular/common/http';


describe('AutenticadorService', () => {
  let service: AutenticadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IonicStorageModule.forRoot()],
      providers: [provideHttpClient()]
    }).compileComponents;
    service = TestBed.inject(AutenticadorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});