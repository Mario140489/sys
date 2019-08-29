import { TestBed } from '@angular/core/testing';

import { TpcontasService } from './tpcontas.service';

describe('TpcontasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TpcontasService = TestBed.get(TpcontasService);
    expect(service).toBeTruthy();
  });
});
