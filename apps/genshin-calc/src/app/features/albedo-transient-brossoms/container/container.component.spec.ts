import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UiCalculatorModule } from '@genshin-calc/ui';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { AlbedoTransientBlossomsContainerComponent } from './container.component';

describe('AlbedoTransientBlossomsContainerComponent', () => {
  let spectator: Spectator<AlbedoTransientBlossomsContainerComponent>;
  const createComponent = createComponentFactory({
    component: AlbedoTransientBlossomsContainerComponent,
    imports: [UiCalculatorModule],
    schemas: [NO_ERRORS_SCHEMA],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  test('should create', () => {
    expect(spectator.component).toBeTruthy();
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

  describe('計算結果を表示する', () => {
    test('計算結果がないときは結果を表示しない', () => {
      spectator.component.set({
        calculation: null,
      });
      spectator.detectChanges();

      expect(spectator.query('ui-calculation-results')).toBeFalsy();
    });

    test('計算結果があるときは結果を表示する', () => {
      spectator.component.set({
        calculation: {
          skillDamage: 1,
          damageBonus: 1,
          result: {
            baseline: 1,
            average: 1,
            critical: 1,
          },
        },
      });
      spectator.detectChanges();

      expect(spectator.query('ui-calculation-results')).toBeTruthy();
    });
  });
});
