import { RouterTestingModule } from '@angular/router/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { CalculatorNavComponent } from './calculator-nav.component';

describe('CalculatorNavComponent', () => {
  let spectator: Spectator<CalculatorNavComponent>;
  const createComponent = createComponentFactory({
    component: CalculatorNavComponent,
    imports: [RouterTestingModule],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  test('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
