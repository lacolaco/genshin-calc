import { Component } from '@angular/core';
import { characters } from '@genshin-calc/core';

@Component({
  templateUrl: './container.component.html',
  styles: [
    `
      :host {
        display: block;
        height: 100%;
      }
    `,
  ],
})
export class GanyuContainerComponent {
  readonly character = characters.ganyu;
}
