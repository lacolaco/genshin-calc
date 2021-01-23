import { ReactiveFormsModule } from '@angular/forms';
import { UiFormsModule } from '@genshin-calc/ui';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { CalculatorFormComponent } from './calculator-form.component';

describe('CalculatorFormComponent', () => {
  let spectator: Spectator<CalculatorFormComponent>;
  const createComponent = createComponentFactory({
    component: CalculatorFormComponent,
    imports: [UiFormsModule, ReactiveFormsModule],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  test('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
