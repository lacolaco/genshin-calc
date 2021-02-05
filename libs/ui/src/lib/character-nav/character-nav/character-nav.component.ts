import { Component, ChangeDetectionStrategy, Input, Directive } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[ui-character-nav-item]',
  host: {
    '[class]': 'isActive ? classListOnActive : classList',
  },
})
export class CharacterNavItemDirective {
  @Input() isActive = false;

  readonly classList = [
    'flex',
    'items-center',
    'border-b-2',
    'focus:outline-none',
    'text-gray-600',
    'hover:text-blue-500',
    'px-6',
    'py-2',
  ];

  readonly classListOnActive = [...this.classList, 'border-blue-500', 'text-blue-500'];
}

@Component({
  selector: 'ui-character-nav',
  templateUrl: './character-nav.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterNavComponent {
  @Input()
  characterName!: string;

  @Input()
  thumbnailSrc!: string;
}
