import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmIconComponent } from './film-icon.component';

describe('FilmIconComponent', () => {
  let component: FilmIconComponent;
  let fixture: ComponentFixture<FilmIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilmIconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilmIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
