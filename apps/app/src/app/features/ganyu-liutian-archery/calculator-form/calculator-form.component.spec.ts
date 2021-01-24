import { ReactiveFormsModule } from '@angular/forms';
import { UiFormsModule } from '@genshin-calc/ui';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { initialState } from '../state';
import { CalculatorParams } from '../types';
import { CalculatorFormComponent } from './calculator-form.component';

describe('CalculatorFormComponent', () => {
  let spectator: Spectator<CalculatorFormComponent>;
  const createComponent = createComponentFactory({
    component: CalculatorFormComponent,
    imports: [UiFormsModule, ReactiveFormsModule],
  });

  beforeEach(() => {
    spectator = createComponent({
      props: {
        value: initialState.calculatorParams,
      },
    });
  });

  test('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  test('inputで受け取った値をフォームにセットする', () => {
    expect(spectator.component.form.value.skillDamage.talentLevel).toEqual(initialState.calculatorParams.talentLevel);
  });

  test('フォームが変更されたとき、新しい値をvalueChangeイベントで出力する', async () => {
    let outputValue!: CalculatorParams;
    spectator.output<CalculatorParams>('valueChange').subscribe((value) => (outputValue = value));

    spectator.component.form.patchValue({ elementalReaction: { elementalMastery: 100 } });
    spectator.detectChanges();

    expect(outputValue.character.stats.elementalMastery).toBe(100);
  });
});
