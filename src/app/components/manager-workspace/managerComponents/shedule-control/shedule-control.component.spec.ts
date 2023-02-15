import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SheduleControlComponent } from './shedule-control.component';

describe('SheduleControlComponent', () => {
  let component: SheduleControlComponent;
  let fixture: ComponentFixture<SheduleControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SheduleControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SheduleControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
