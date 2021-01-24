import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { ControlLabelComponent } from '../control-label/control-label.component';
import { NumberInputComponent } from './number-input.component';

describe('NumberInputComponent', () => {
  let spectator: Spectator<NumberInputComponent>;
  const createComponent = createComponentFactory({
    component: NumberInputComponent,
    declarations: [ControlLabelComponent],
  });

  beforeEach(async () => {
    spectator = createComponent({});
  });

  test('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  describe('writeValue', () => {
    test('decimalモードのとき、与えられたvalueをそのままinput要素にセットする', () => {
      const value = 100;
      spectator.component.writeValue(value);
      spectator.detectComponentChanges();

      const input = spectator.query<HTMLInputElement>('input');
      expect(input && input.value).toBe('100');
    });

    test('percentモードのとき、与えられたvalueを百分率に変換してinput要素にセットする', () => {
      const value = 0.5;
      spectator.setInput({ mode: 'percent' });
      spectator.component.writeValue(value);
      spectator.detectComponentChanges();

      const input = spectator.query<HTMLInputElement>('input');
      expect(input && input.value).toBe('50.0');
    });
  });

  describe('valueChange', () => {
    test('decimalモードのとき、input要素のvalueをそのまま出力する', () => {
      jest.spyOn(spectator.component, 'onChange');
      spectator.setInput({ mode: 'decimal' });
      spectator.typeInElement('100', 'input');

      expect(spectator.component.onChange).toHaveBeenCalledWith(100);
    });

    test('percentモードのとき、input要素のvalueを百分率から戻して出力する', () => {
      jest.spyOn(spectator.component, 'onChange');
      spectator.setInput({ mode: 'percent' });
      spectator.typeInElement('100', 'input');

      expect(spectator.component.onChange).toHaveBeenCalledWith(1);
    });
  });
});
