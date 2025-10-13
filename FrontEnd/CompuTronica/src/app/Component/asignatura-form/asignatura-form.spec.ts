import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignaturaFormComponent  } from './asignatura-form';

describe('AsignaturaForm', () => {
  let component: AsignaturaFormComponent ;
  let fixture: ComponentFixture<AsignaturaFormComponent >;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsignaturaFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignaturaFormComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
