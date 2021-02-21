import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UiCalculatorModule, UiFormsModule } from '@genshin-calc/ui';
import { CalculatorFormComponent } from './calculator-form/calculator-form.component';
import { FormContainerComponent } from './container.component';

@NgModule({
  declarations: [FormContainerComponent, CalculatorFormComponent],
  imports: [CommonModule, ReactiveFormsModule, UiFormsModule, UiCalculatorModule],
})
export class XiaoLemniscaticWindCyclingModule {}
