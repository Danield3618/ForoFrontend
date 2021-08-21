import { TestBed } from '@angular/core/testing';

import { ValidarTextoService } from './validar-texto.service';

describe('ValidarTextoService', () => {
  let service: ValidarTextoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidarTextoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
