import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { FormFieldsComponent } from './form-fields.component';

describe('FormFieldsComponent', () => {
  let spectator: Spectator<FormFieldsComponent>;
  const createComponent = createComponentFactory({
    component: FormFieldsComponent,
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  test('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
