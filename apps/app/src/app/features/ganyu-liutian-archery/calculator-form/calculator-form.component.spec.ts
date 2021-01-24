import { ReactiveFormsModule } from '@angular/forms';
import { UiFormsModule } from '@genshin-calc/ui';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { initialState } from '../state';
import { FormValues } from '../types';
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

  test('inputで受け取った値をフォームにセットする', () => {
    const formValues = initialState.inputValues;
    spectator.setInput('value', formValues);

    expect(spectator.component.form.value).toEqual(formValues);
  });

  test('フォームが変更されたとき、新しい値をvalueChangeイベントで出力する', async () => {
    spectator.setInput('value', initialState.inputValues);
    const expectedValue: FormValues = {
      ...initialState.inputValues,
      elementalReaction: {
        ...initialState.inputValues.elementalReaction,
        elementalMastery: 100,
      },
    };
    let outputValue;
    spectator.output('valueChange').subscribe((value) => (outputValue = value));

    spectator.component.form.patchValue({ elementalReaction: { elementalMastery: 100 } });
    spectator.detectChanges();

    expect(outputValue).toEqual(expectedValue);
  });
});
