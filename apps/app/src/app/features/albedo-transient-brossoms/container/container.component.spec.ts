import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UiCalculatorModule } from '@genshin-calc/ui';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { CalculatorFormComponent } from '../calculator-form/calculator-form.component';
import { AlbedoTransientBlossomsContainerComponent } from './container.component';

describe('AlbedoTransientBlossomsContainerComponent', () => {
  let spectator: Spectator<AlbedoTransientBlossomsContainerComponent>;
  const createComponent = createComponentFactory({
    component: AlbedoTransientBlossomsContainerComponent,
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

    expect(calculatorContent).toContain('アルベド: 元素スキル「創生術・疑似陽華」');
  });
  test('サブタイトルを表示する', () => {
    const calculatorContent = spectator.element.textContent;

    expect(calculatorContent).toContain('刹那の花ダメージ');
  });

  describe('フォーム入力に従ってダメージを計算する', () => {
    test('フォーム入力の変更で計算結果を更新する', () => {
      spectator.component.onFormValueChange({
        skillDamage: {
          def: 1,
          talentLevel: 1,
        },
        damageBonus: {
          skillDamageBonus: 0,
          elementalDamageBonus: 0,
          enableGeoResonance: false,
        },
        damageReduction: {
          baseResistance: 1,
          characterLevel: 1,
          enemyLevel: 1,
        },
        critical: {
          criticalDamage: 1,
          criticalRate: 1,
        },
      });

      expect(spectator.component.get().calculation).toBeTruthy();
    });
  });

  test('フォームを表示する', () => {
    const formComponent = spectator.query(CalculatorFormComponent);

    expect(formComponent).toBeTruthy();
  });
});
