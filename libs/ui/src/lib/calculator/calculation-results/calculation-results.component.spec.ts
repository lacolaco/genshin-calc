import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { CalculationResultsComponent } from './calculation-results.component';

describe('CalculationResultsComponent', () => {
  let spectator: Spectator<CalculationResultsComponent>;
  const createComponent = createComponentFactory({
    component: CalculationResultsComponent,
  });

  beforeEach(() => {
    spectator = createComponent({
      props: {
        calculatedDamage: {
          baseline: 1000,
          average: 1500,
          critical: 2000,
        },
      },
    });
  });

  test('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  describe('元素ごとにダメージの文字色を変える', () => {
    test('岩元素ダメージのときは文字色をyellow-500にする', () => {
      spectator.setInput({ element: 'geo' });
      expect(spectator.component.textColor).toBe('text-yellow-500');
    });
    test('氷元素ダメージのときは文字色をblue-300にする', () => {
      spectator.setInput({ element: 'cryo' });
      expect(spectator.component.textColor).toBe('text-blue-300');
    });
  });
});
