import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculationResultsComponent } from './calculation-results.component';

describe('CalculationResultsComponent', () => {
  let component: CalculationResultsComponent;
  let fixture: ComponentFixture<CalculationResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalculationResultsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculationResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
