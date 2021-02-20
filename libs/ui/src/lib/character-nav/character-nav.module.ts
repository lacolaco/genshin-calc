import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterNavComponent } from './character-nav.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CharacterNavComponent],
  imports: [CommonModule, RouterModule],
  exports: [CharacterNavComponent],
})
export class UiCharacterNavModule {}
