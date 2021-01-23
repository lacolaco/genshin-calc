import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { CheckboxComponent } from './checkbox.component';

describe('CheckboxComponent', () => {
  let spectator: Spectator<CheckboxComponent>;
  const createComponent = createComponentFactory({
    component: CheckboxComponent,
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  test('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
