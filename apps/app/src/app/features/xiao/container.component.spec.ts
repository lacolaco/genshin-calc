import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { UiCalculatorNavModule } from '@genshin-calc/ui';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { XiaoContainerComponent } from './container.component';

describe('XiaoContainerComponent', () => {
  let spectator: Spectator<XiaoContainerComponent>;
  const createComponent = createComponentFactory({
    component: XiaoContainerComponent,
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

    expect(calculatorContent).toContain('魈');
  });

  test('計算機へのリンクを表示する', () => {
    const links = spectator.queryAll('a').map((el) => el.textContent?.trim());

    expect(links).toEqual(['元素スキル「風輪両立」']);
  });
});
