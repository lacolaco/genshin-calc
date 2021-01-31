import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UiCalculatorModule } from '@genshin-calc/ui';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { CalculatorFormComponent } from '../calculator-form/calculator-form.component';
import { initialState } from '../state';
import { ContainerComponent } from './container.component';

describe('ContainerComponent', () => {
  let spectator: Spectator<ContainerComponent>;
  const createComponent = createComponentFactory({
    component: ContainerComponent,
    declarations: [CalculatorFormComponent],
    imports: [UiCalculatorModule],
    schemas: [NO_ERRORS_SCHEMA],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  test('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  test('タイトルを表示する', () => {
    const calculatorContent = spectator.element.textContent;

    expect(calculatorContent).toContain('汎用ダメージ計算');
  });

  test('サブタイトルを表示する', () => {
    const calculatorContent = spectator.element.textContent;

    expect(calculatorContent).toContain('攻撃力依存のダメージ');
  });

  describe('フォーム入力に従ってダメージを計算する', () => {
    beforeEach(() => {
      spectator.component.calculate(initialState.calculatorParams);
    });

    test('フォーム入力の変更で計算パラメータを更新する', () => {
      spectator.component.calculate({
        ...initialState.calculatorParams,
        skillDamage: 1000,
      });

      expect(spectator.component.get().calculatorParams.skillDamage).toBe(1000);
    });
  });
  test('フォームを表示する', () => {
    const formComponent = spectator.query(CalculatorFormComponent);

    expect(formComponent).toBeTruthy();
  });
});
