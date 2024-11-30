import { TestBed } from '@angular/core/testing';

import { ApicontroladorService } from './apicontrolador.service';
import { IonicStorageModule } from '@ionic/storage-angular';
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';

describe('ApicontroladorService', () => {
  let service: ApicontroladorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IonicStorageModule.forRoot()],
      providers: [provideHttpClient()]
    }).compileComponents;
    service = TestBed.inject(ApicontroladorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
