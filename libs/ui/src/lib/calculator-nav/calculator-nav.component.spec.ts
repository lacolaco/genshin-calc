import { characters } from '@genshin-calc/core';
import { createDirectiveFactory, createHostFactory, SpectatorDirective, SpectatorHost } from '@ngneat/spectator/jest';
import { CalculatorNavComponent, CalculatorNavItemDirective } from './calculator-nav.component';

describe('CalculatorNavComponent', () => {
  let spectator: SpectatorHost<CalculatorNavComponent>;
  const createHost = createHostFactory({
    component: CalculatorNavComponent,
  });

  beforeEach(() => {
    spectator = createHost(
      `
    <ui-calculator-nav [character]="character">
      <div ui-calculator-nav-item></div>
      <div ui-calculator-nav-item></div>
    </ui-calculator-nav>
    `,
      {
        hostProps: {
          character: characters.albedo,
        },
      },
    );
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should display character name', () => {
    expect(spectator.element).toContainText(characters.albedo.displayName);
  });

  it('should display character thumbnail', () => {
    expect(spectator.query('img')).toHaveAttribute('src', characters.albedo.thumbnailUrl);
  });

  it('should project nav items', () => {
    expect(spectator.queryAll('[ui-calculator-nav-item]').length).toBe(2);
  });
});

describe('CalculatorNavItemDirective', () => {
  let spectator: SpectatorDirective<CalculatorNavItemDirective>;
  const createSpectator = createDirectiveFactory(CalculatorNavItemDirective);

  it('should create', () => {
    spectator = createSpectator(`<div ui-calculator-nav-item></div>`, {});

    expect(spectator.directive).toBeTruthy();
  });

  it('should have inactive style', () => {
    spectator = createSpectator(`<div ui-calculator-nav-item></div>`, {});

    expect(spectator.directive.isActive).toBe(false);
  });

  it('should have active style', () => {
    spectator = createSpectator(`<div ui-calculator-nav-item [isActive]="true"></div>`, {});

    expect(spectator.directive.isActive).toBe(true);
  });
});
