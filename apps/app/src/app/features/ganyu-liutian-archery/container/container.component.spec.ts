import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UiCalculatorModule } from '@genshin-calc/ui';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { initialState } from '../state';
import { GanyuLiutianArcheryContainerComponent } from './container.component';

describe('GanyuLiutianArcheryContainerComponent', () => {
  let spectator: Spectator<GanyuLiutianArcheryContainerComponent>;
  const createComponent = createComponentFactory({
    component: GanyuLiutianArcheryContainerComponent,
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
    beforeEach(() => {
      spectator.component.onFormValueChange(initialState.inputValues);
    });

    test('フォーム入力の変更で計算結果を更新する', () => {
      expect(spectator.component.get().calculation).toBeTruthy();
    });

    test('入力が同じなら計算結果が変わらない', () => {
      expect(spectator.component.get().calculation).toMatchInlineSnapshot(`
        Object {
          "damageBonus": 0.85,
          "result": Object {
            "average": 6346,
            "baseline": 6043,
            "critical": 9065,
          },
          "skillDamage": 7260,
        }
      `);
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
