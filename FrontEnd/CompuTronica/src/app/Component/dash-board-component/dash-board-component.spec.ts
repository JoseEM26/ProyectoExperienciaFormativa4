import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashBoardCOmponent } from './dash-board-component';

describe('DashBoardCOmponent', () => {
  let component: DashBoardCOmponent;
  let fixture: ComponentFixture<DashBoardCOmponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashBoardCOmponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashBoardCOmponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
