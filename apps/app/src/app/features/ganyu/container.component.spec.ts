import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { UiCharacterNavModule } from '@genshin-calc/ui';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { GanyuContainerComponent } from './container.component';

describe('GanyuContainerComponent', () => {
  let spectator: Spectator<GanyuContainerComponent>;
  const createComponent = createComponentFactory({
    component: GanyuContainerComponent,
    imports: [UiCharacterNavModule, RouterTestingModule],
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

  test('通常攻撃の計算機へのリンクを表示する', () => {
    const link = spectator.queryAll('a').some((el) => el.textContent?.includes('通常攻撃・流天射術'));

    expect(link).toBeDefined();
  });
});
