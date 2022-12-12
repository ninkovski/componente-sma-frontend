import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertaAccionMedidaComponent } from './alerta-accion-medida.component';

describe('AlertaAccionMedidaComponent', () => {
  let component: AlertaAccionMedidaComponent;
  let fixture: ComponentFixture<AlertaAccionMedidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertaAccionMedidaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertaAccionMedidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
