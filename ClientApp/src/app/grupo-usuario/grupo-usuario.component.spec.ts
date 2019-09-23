import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoUsuarioComponent } from './grupo-usuario.component';

describe('GrupoUsuarioComponent', () => {
  let component: GrupoUsuarioComponent;
  let fixture: ComponentFixture<GrupoUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrupoUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
