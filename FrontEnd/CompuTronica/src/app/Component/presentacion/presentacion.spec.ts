import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Presentacion } from './presentacion';

describe('Presentacion', () => {
  let component: Presentacion;
  let fixture: ComponentFixture<Presentacion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Presentacion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Presentacion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
