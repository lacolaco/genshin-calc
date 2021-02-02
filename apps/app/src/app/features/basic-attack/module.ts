import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UiCalculatorModule, UiFormsModule } from '@genshin-calc/ui';
import { CalculatorFormComponent } from './calculator-form/calculator-form.component';
import { ContainerComponent } from './container/container.component';

@NgModule({
  declarations: [ContainerComponent, CalculatorFormComponent],
  imports: [CommonModule, ReactiveFormsModule, UiFormsModule, UiCalculatorModule],
  exports: [ContainerComponent],
})
export class BasicAttackModule {}