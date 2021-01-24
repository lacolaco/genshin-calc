import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UiCalculatorModule } from '@genshin-calc/ui';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { CalculatorFormComponent } from '../calculator-form/calculator-form.component';
import { initialState } from '../state';
import { GanyuLiutianArcheryContainerComponent } from './container.component';

describe('GanyuLiutianArcheryContainerComponent', () => {
  let spectator: Spectator<GanyuLiutianArcheryContainerComponent>;
  const createComponent = createComponentFactory({
    component: GanyuLiutianArcheryContainerComponent,
    imports: [UiCalculatorModule],
    declarations: [CalculatorFormComponent],
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

    expect(calculatorContent).toContain('甘雨: 通常攻撃・流天射術');
  });
  test('サブタイトルを表示する', () => {
    const calculatorContent = spectator.element.textContent;

    expect(calculatorContent).toContain('霜華の矢+霜華満開ダメージ');
  });

  describe('フォーム入力に従ってダメージを計算する', () => {
    beforeEach(() => {
      spectator.component.setCalculateParams(initialState.calculatorParams);
    });

    test('フォーム入力の変更で計算パラメータを更新する', () => {
      spectator.component.setCalculateParams({
        ...initialState.calculatorParams,
        character: {
          ...initialState.calculatorParams.character,
          level: 100,
        },
      });

      expect(spectator.component.get().calculatorParams.character.level).toBe(100);
    });
  });

  test('フォームを表示する', () => {
    const formComponent = spectator.query(CalculatorFormComponent);

    expect(formComponent).toBeTruthy();
  });
});
