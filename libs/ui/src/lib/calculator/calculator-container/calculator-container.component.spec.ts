import { createHostFactory, Spectator } from '@ngneat/spectator';
import { CalculationResultsComponent } from '../calculation-results/calculation-results.component';
import {
  CalculatorContainerComponent,
  CalculatorDescriptionComponent,
  CalculatorTitleComponent,
} from './calculator-container.component';

describe('CalculatorContainerComponent', () => {
  let spectator: Spectator<CalculatorContainerComponent>;
  const createHost = createHostFactory({
    component: CalculatorContainerComponent,
    declarations: [CalculationResultsComponent, CalculatorTitleComponent, CalculatorDescriptionComponent],
  });

  beforeEach(() => {
    spectator = createHost(
      `<ui-calculator-container [elementType]="'geo'">
      <ui-calculator-title>タイトル</ui-calculator-title>
      <ui-calculator-description>説明文</ui-calculator-description>
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

  describe('説明文を表示する', () => {
    test('ui-calculator-description 要素のコンテンツを表示する', () => {
      const content = spectator.query('ui-calculator-description')?.textContent;

      expect(content).toContain('説明文');
    });
  });
});
