import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculationResultsComponent } from './calculation-results/calculation-results.component';

@NgModule({
  declarations: [CalculationResultsComponent],
  imports: [CommonModule],
  exports: [CalculationResultsComponent],
})
export class UiCalculatorModule {}
