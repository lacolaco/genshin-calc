import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { UiCalculatorNavModule } from '@genshin-calc/ui';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { NoelleContainerComponent } from './container.component';

describe('NoelleContainerComponent', () => {
  let spectator: Spectator<NoelleContainerComponent>;
  const createComponent = createComponentFactory({
    component: NoelleContainerComponent,
    imports: [UiCalculatorNavModule, RouterTestingModule],
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

    expect(calculatorContent).toContain('ノエル');
  });

  test('計算機へのリンクを表示する', () => {
    const link = spectator.queryAll('a').some((el) => el.textContent?.includes('元素爆発「大掃除」'));

    expect(link).toBeDefined();
  });
});
