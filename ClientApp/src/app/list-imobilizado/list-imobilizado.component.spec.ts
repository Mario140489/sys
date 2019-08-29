import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListImobilizadoComponent } from './list-imobilizado.component';

describe('ListImobilizadoComponent', () => {
  let component: ListImobilizadoComponent;
  let fixture: ComponentFixture<ListImobilizadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListImobilizadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListImobilizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
