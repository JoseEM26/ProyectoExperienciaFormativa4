import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Layaout } from './layaout';

describe('Layaout', () => {
  let component: Layaout;
  let fixture: ComponentFixture<Layaout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Layaout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Layaout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
