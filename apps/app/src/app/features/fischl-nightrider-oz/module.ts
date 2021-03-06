import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UiCalculatorModule, UiCalculatorNavModule, UiFormsModule } from '@genshin-calc/ui';
import { CalculatorFormComponent } from './calculator-form/calculator-form.component';
import { ContainerComponent } from './container/container.component';
import { FischlRoutingModule } from './routing.module';

@NgModule({
  declarations: [ContainerComponent, CalculatorFormComponent],
  imports: [
    CommonModule,
    FischlRoutingModule,
    ReactiveFormsModule,
    UiFormsModule,
    UiCalculatorModule,
    UiCalculatorNavModule,
  ],
  exports: [ContainerComponent],
})
export class FischlNightriderOzModule {}
