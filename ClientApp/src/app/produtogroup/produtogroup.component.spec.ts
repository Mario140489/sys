import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutogroupComponent } from './produtogroup.component';

describe('ProdutogroupComponent', () => {
  let component: ProdutogroupComponent;
  let fixture: ComponentFixture<ProdutogroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdutogroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutogroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
