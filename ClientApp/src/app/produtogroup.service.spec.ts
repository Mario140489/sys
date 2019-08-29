import { TestBed } from '@angular/core/testing';

import { ProdutogroupService } from './produtogroup.service';

describe('ProdutogroupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProdutogroupService = TestBed.get(ProdutogroupService);
    expect(service).toBeTruthy();
  });
});
