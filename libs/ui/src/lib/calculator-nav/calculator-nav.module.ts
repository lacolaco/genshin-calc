import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculatorNavComponent, CalculatorNavItemDirective } from './calculator-nav.component';

@NgModule({
  declarations: [CalculatorNavComponent, CalculatorNavItemDirective],
  imports: [CommonModule],
  exports: [CalculatorNavComponent, CalculatorNavItemDirective],
})
export class UiCalculatorNavModule {}
