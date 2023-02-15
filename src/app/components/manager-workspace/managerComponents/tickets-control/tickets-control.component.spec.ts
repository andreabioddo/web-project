import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsControlComponent } from './tickets-control.component';

describe('TicketsControlComponent', () => {
  let component: TicketsControlComponent;
  let fixture: ComponentFixture<TicketsControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketsControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketsControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
