import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculatorNavComponent } from './calculator-nav/calculator-nav.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CalculatorNavComponent],
  imports: [CommonModule, RouterModule],
  exports: [CalculatorNavComponent],
})
export class CoreModule {}
