import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UiCalculatorModule, UiCalculatorNavModule } from '@genshin-calc/ui';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { CalculatorFormComponent } from '../calculator-form/calculator-form.component';
import { initialState } from '../state';
import { ContainerComponent } from './container.component';

describe('ContainerComponent', () => {
  let spectator: Spectator<ContainerComponent>;
  const createComponent = createComponentFactory({
    component: ContainerComponent,
    declarations: [CalculatorFormComponent],
    imports: [UiCalculatorModule, UiCalculatorNavModule],
    schemas: [NO_ERRORS_SCHEMA],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  test('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  test('キャラクター名を表示する', () => {
    const calculatorContent = spectator.element.textContent;

    expect(calculatorContent).toContain('レザー');
  });

  test('スキル名を表示する', () => {
    const calculatorContent = spectator.element.textContent;

    expect(calculatorContent).toContain('通常攻撃・鋼の脊');
  });

  test('サブタイトルを表示する', () => {
    const calculatorContent = spectator.element.textContent;

    expect(calculatorContent).toContain('通常ダメージ');
  });

  describe('フォーム入力に従ってダメージを計算する', () => {
    beforeEach(() => {
      spectator.component.calculate(initialState.calculatorParams);
    });

    test('フォーム入力の変更で計算パラメータを更新する', () => {
      spectator.component.calculate({
        ...initialState.calculatorParams,
        talentLevel: 10,
      });

      expect(spectator.component.get().calculatorParams.talentLevel).toBe(10);
    });
  });
  test('フォームを表示する', () => {
    const formComponent = spectator.query(CalculatorFormComponent);

    expect(formComponent).toBeTruthy();
  });
});
