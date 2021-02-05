import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UiCalculatorModule, UiCharacterNavModule } from '@genshin-calc/ui';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { CalculatorFormComponent } from '../calculator-form/calculator-form.component';
import { initialState } from '../state';
import { AlbedoTransientBlossomsContainerComponent } from './container.component';

describe('AlbedoTransientBlossomsContainerComponent', () => {
  let spectator: Spectator<AlbedoTransientBlossomsContainerComponent>;
  const createComponent = createComponentFactory({
    component: AlbedoTransientBlossomsContainerComponent,
    declarations: [CalculatorFormComponent],
    imports: [UiCalculatorModule, UiCharacterNavModule],
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

    expect(calculatorContent).toContain('アルベド');
  });

  test('スキル名を表示する', () => {
    const calculatorContent = spectator.element.textContent;

    expect(calculatorContent).toContain('元素スキル「創生術・疑似陽華」');
  });

  test('サブタイトルを表示する', () => {
    const calculatorContent = spectator.element.textContent;

    expect(calculatorContent).toContain('刹那の花ダメージ');
  });

  describe('フォーム入力に従ってダメージを計算する', () => {
    test('フォーム入力の変更で計算パラメータを更新する', () => {
      spectator.component.setCalculateParams({
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
