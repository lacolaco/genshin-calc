import { RouterTestingModule } from '@angular/router/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { CharacterNavComponent } from './character-nav.component';

describe('CharacterNavComponent', () => {
  let spectator: Spectator<CharacterNavComponent>;
  const createComponent = createComponentFactory({
    component: CharacterNavComponent,
    imports: [RouterTestingModule],
  });

  beforeEach(() => {
    spectator = createComponent({});
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
