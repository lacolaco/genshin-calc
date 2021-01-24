import { createHostFactory, Spectator } from '@ngneat/spectator';
import { CalculationResultsComponent } from '../calculation-results/calculation-results.component';
import {
  CalculatorContainerComponent,
  CalculatorSubtitleComponent,
  CalculatorTitleComponent,
} from './calculator-container.component';

describe('CalculatorContainerComponent', () => {
  let spectator: Spectator<CalculatorContainerComponent>;
  const createHost = createHostFactory({
    component: CalculatorContainerComponent,
    declarations: [CalculationResultsComponent, CalculatorTitleComponent, CalculatorSubtitleComponent],
  });

  beforeEach(() => {
    spectator = createHost(
      `<ui-calculator-container [calculation]="calculation" [elementType]="'geo'">
      <ui-calculator-title>タイトル</ui-calculator-title>
      <ui-calculator-subtitle>サブタイトル</ui-calculator-subtitle>
    </ui-calculator-container>`,
      {
        hostProps: {
          calculation: null,
        },
      },
    );
  });

  test('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  describe('タイトルを表示する', () => {
    test('ui-calculator-title 要素のコンテンツを表示する', () => {
      const content = spectator.query('ui-calculator-title')?.textContent;

      expect(content).toContain('タイトル');
    });
  });

  describe('サブタイトルを表示する', () => {
    test('ui-calculator-subtitle 要素のコンテンツを表示する', () => {
      const content = spectator.query('ui-calculator-subtitle')?.textContent;

      expect(content).toContain('サブタイトル');
    });
  });

  describe('計算結果を表示する', () => {
    test('calculationがないときは結果を表示しない', () => {
      spectator.setInput('calculation', null);
      spectator.detectChanges();

      expect(spectator.query(CalculationResultsComponent)).toBeFalsy();
    });

    test('calculationがあるときは結果を表示する', () => {
      spectator.setInput('calculation', {
        skillDamage: 1,
        damageBonus: 1,
        calculatedDamage: { baseline: 1, average: 1, critical: 1 },
      });
      spectator.detectChanges();

      expect(spectator.query(CalculationResultsComponent)).toBeTruthy();
    });
  });
});
