import { Component, Input } from '@angular/core';

export interface CharacterNavItem {
  path: string;
  displayName: string;
  thumbnailUrl: string;
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
})
export class CharacterNavComponent {
  @Input() characters: Array<CharacterNavItem> = [];
}
