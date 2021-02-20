import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UiCharacterNavModule } from '@genshin-calc/ui';
import { CalculatorNavComponent } from './calculator-nav/calculator-nav.component';

@NgModule({
  declarations: [CalculatorNavComponent],
  imports: [CommonModule, RouterModule, UiCharacterNavModule],
  exports: [CalculatorNavComponent],
})
export class CoreModule {}
