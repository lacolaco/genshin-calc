import { createDirectiveFactory, createHostFactory, SpectatorDirective, SpectatorHost } from '@ngneat/spectator/jest';
import { CalculatorNavComponent, CalculatorNavItemDirective } from './calculator-nav.component';

describe('CalculatorNavComponent', () => {
  let spectator: SpectatorHost<CalculatorNavComponent>;
  const createSpectator = createHostFactory({
    component: CalculatorNavComponent,
  });

  beforeEach(() => {
    spectator = createSpectator(
      `
    <ui-calculator-nav>
      <div ui-calculator-nav-item></div>
      <div ui-calculator-nav-item></div>
    </ui-calculator-nav>
    `,
      {},
    );
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
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
