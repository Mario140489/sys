import { TestBed } from '@angular/core/testing';

import { ImobilizadoService } from './service/imobilizado.service';

describe('ImobilizadoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImobilizadoService = TestBed.get(ImobilizadoService);
    expect(service).toBeTruthy();
  });
});
