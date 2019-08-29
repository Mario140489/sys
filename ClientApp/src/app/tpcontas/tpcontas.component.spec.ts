import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TpcontasComponent } from './tpcontas.component';

describe('TpcontasComponent', () => {
  let component: TpcontasComponent;
  let fixture: ComponentFixture<TpcontasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TpcontasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TpcontasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
