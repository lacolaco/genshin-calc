import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { CharacterNavComponent } from './character-nav.component';

describe('CharacterNavComponent', () => {
  let spectator: Spectator<CharacterNavComponent>;
  const createComponent = createComponentFactory(CharacterNavComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
