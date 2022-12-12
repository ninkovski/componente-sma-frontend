import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecaRegisterComponent } from './reca-register.component';

describe('RecaRegisterComponent', () => {
  let component: RecaRegisterComponent;
  let fixture: ComponentFixture<RecaRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecaRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecaRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
