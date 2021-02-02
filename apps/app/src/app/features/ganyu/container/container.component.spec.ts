import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UiCalculatorModule } from '@genshin-calc/ui';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { GanyuContainerComponent } from './container.component';

describe('GanyuContainerComponent', () => {
  let spectator: Spectator<GanyuContainerComponent>;
  const createComponent = createComponentFactory({
    component: GanyuContainerComponent,
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

    expect(calculatorContent).toContain('甘雨');
  });
});
