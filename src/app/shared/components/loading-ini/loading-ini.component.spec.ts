import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingIniComponent } from './loading-ini.component';

describe('LoadingIniComponent', () => {
  let component: LoadingIniComponent;
  let fixture: ComponentFixture<LoadingIniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadingIniComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingIniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
