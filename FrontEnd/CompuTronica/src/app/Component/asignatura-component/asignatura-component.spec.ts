import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignaturasComponent } from './asignatura-component';

describe('AsignaturaComponent', () => {
  let component: AsignaturasComponent;
  let fixture: ComponentFixture<AsignaturasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsignaturasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignaturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
