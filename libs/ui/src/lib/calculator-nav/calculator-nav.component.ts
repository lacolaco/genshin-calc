import { Component, ChangeDetectionStrategy, Input, Directive, Optional, Host, DoCheck } from '@angular/core';
import { RouterLinkActive } from '@angular/router';
import { Character } from '@genshin-calc/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[ui-calculator-nav-item]',
  host: {
    '[class]': 'isActive ? classListOnActive : classList',
  },
})
export class CalculatorNavItemDirective implements DoCheck {
  @Input() isActive = false;

  readonly classList = [
    'flex',
    'items-center',
    'border-b-2',
    'focus:outline-none',
    'hover:text-blue-500',
    'text-gray-600',
    'px-6',
    'py-2',
  ];

  readonly classListOnActive = [...this.classList, 'border-blue-500', 'text-blue-500'];

  constructor(@Optional() @Host() private readonly routerLinkActive?: RouterLinkActive) {}

  ngDoCheck() {
    if (this.routerLinkActive) {
      this.isActive = this.routerLinkActive.isActive;
    }
  }
}

@Component({
  selector: 'ui-calculator-nav',
  templateUrl: './calculator-nav.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatorNavComponent {
  @Input()
  character!: Character;
}
