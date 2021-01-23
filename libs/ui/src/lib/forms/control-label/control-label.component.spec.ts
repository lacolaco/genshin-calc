import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { ControlLabelComponent } from './control-label.component';

describe('ControlLabelComponent', () => {
  let spectator: Spectator<ControlLabelComponent>;
  const createComponent = createComponentFactory({
    component: ControlLabelComponent,
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  test('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
