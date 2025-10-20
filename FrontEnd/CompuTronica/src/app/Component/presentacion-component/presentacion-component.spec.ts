import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentacionCOmponent } from './presentacion-component';

describe('PresentacionCOmponent', () => {
  let component: PresentacionCOmponent;
  let fixture: ComponentFixture<PresentacionCOmponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PresentacionCOmponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PresentacionCOmponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
