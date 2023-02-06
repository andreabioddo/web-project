import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheatersControlComponent } from './theaters-control.component';

describe('TheatersControlComponent', () => {
  let component: TheatersControlComponent;
  let fixture: ComponentFixture<TheatersControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TheatersControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TheatersControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
