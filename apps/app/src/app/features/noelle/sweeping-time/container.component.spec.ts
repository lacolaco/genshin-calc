import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UiCalculatorModule } from '@genshin-calc/ui';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { CharacterStore } from '../character-state';
import { CalculatorFormComponent } from './calculator-form/calculator-form.component';
import { FormContainerComponent } from './container.component';
import { initialState } from './state';

describe('FormContainerComponent', () => {
  let spectator: Spectator<FormContainerComponent>;
  const createComponent = createComponentFactory({
    component: FormContainerComponent,
    imports: [UiCalculatorModule],
    providers: [CharacterStore],
    declarations: [CalculatorFormComponent],
    schemas: [NO_ERRORS_SCHEMA],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  test('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  test('サブタイトルを表示する', () => {
    const calculatorContent = spectator.element.textContent;

    expect(calculatorContent).toContain('発動中　通常攻撃ダメージ');
  });

  describe('フォーム入力に従ってダメージを計算する', () => {
    beforeEach(() => {
      spectator.component.setCalculateParams(initialState);
    });

    test('フォーム入力の変更で計算パラメータを更新する', () => {
      spectator.component.setCalculateParams({
        ...initialState,
        talentLevel: 10,
      });

      expect(spectator.component.get().talentLevel).toBe(10);
    });
  });

  test('フォームを表示する', () => {
    const formComponent = spectator.query(CalculatorFormComponent);

    expect(formComponent).toBeTruthy();
  });
});
