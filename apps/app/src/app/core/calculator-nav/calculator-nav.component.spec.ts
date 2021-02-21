import { RouterTestingModule } from '@angular/router/testing';
import { UiCharacterNavModule } from '@genshin-calc/ui';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { CalculatorNavComponent } from './calculator-nav.component';

describe('CalculatorNavComponent', () => {
  let spectator: Spectator<CalculatorNavComponent>;
  const createComponent = createComponentFactory({
    component: CalculatorNavComponent,
    imports: [RouterTestingModule, UiCharacterNavModule],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  test('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
