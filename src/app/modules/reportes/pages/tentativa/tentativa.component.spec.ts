import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TentativaComponent } from './tentativa.component';

describe('TentativaComponent', () => {
  let component: TentativaComponent;
  let fixture: ComponentFixture<TentativaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TentativaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TentativaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
