import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecaListComponent } from './reca-list.component';

describe('RecaListComponent', () => {
  let component: RecaListComponent;
  let fixture: ComponentFixture<RecaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecaListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
