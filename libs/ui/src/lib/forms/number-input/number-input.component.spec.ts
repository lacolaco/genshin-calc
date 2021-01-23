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
});
