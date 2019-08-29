import { TestBed } from '@angular/core/testing';

import { CartoesService } from './cartoes.service';

describe('CartoesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CartoesService = TestBed.get(CartoesService);
    expect(service).toBeTruthy();
  });
});
