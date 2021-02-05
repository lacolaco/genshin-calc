import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterNavComponent, CharacterNavItemDirective } from './character-nav/character-nav.component';

@NgModule({
  declarations: [CharacterNavComponent, CharacterNavItemDirective],
  imports: [CommonModule],
  exports: [CharacterNavComponent, CharacterNavItemDirective],
})
export class UiCharacterNavModule {}
