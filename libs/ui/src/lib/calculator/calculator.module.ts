import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CalculationResultsComponent } from './calculation-results/calculation-results.component';
import {
  CalculatorContainerComponent,
  CalculatorSubtitleComponent,
  CalculatorTitleComponent,
} from './calculator-container/calculator-container.component';

@NgModule({
  declarations: [
    CalculationResultsComponent,
    CalculatorContainerComponent,
    CalculatorTitleComponent,
    CalculatorSubtitleComponent,
  ],
  imports: [CommonModule],
  exports: [
    CalculationResultsComponent,
    CalculatorContainerComponent,
    CalculatorTitleComponent,
    CalculatorSubtitleComponent,
  ],
})
export class UiCalculatorModule {}
