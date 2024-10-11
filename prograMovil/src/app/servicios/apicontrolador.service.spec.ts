import { TestBed } from '@angular/core/testing';

import { ApicontroladorService } from './apicontrolador.service';

describe('ApicontroladorService', () => {
  let service: ApicontroladorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApicontroladorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
