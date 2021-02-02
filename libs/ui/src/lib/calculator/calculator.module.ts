import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CalculationResultsComponent } from './calculation-results/calculation-results.component';
import {
  CalculatorContainerComponent,
  CalculatorDescriptionComponent,
  CalculatorTitleComponent,
} from './calculator-container/calculator-container.component';

@NgModule({
  declarations: [
    CalculationResultsComponent,
    CalculatorContainerComponent,
    CalculatorTitleComponent,
    CalculatorDescriptionComponent,
  ],
  imports: [CommonModule],
  exports: [
    CalculationResultsComponent,
    CalculatorContainerComponent,
    CalculatorTitleComponent,
    CalculatorDescriptionComponent,
  ],
})
export class UiCalculatorModule {}
