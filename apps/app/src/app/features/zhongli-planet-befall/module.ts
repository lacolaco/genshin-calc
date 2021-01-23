import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UiCalculatorModule, UiFormsModule } from '@genshin-calc/ui';
import { CalculatorFormComponent } from './calculator-form/calculator-form.component';
import { ZhongliPlanetBefallContainerComponent } from './container/container.component';

@NgModule({
  declarations: [ZhongliPlanetBefallContainerComponent, CalculatorFormComponent],
  imports: [CommonModule, ReactiveFormsModule, UiFormsModule, UiCalculatorModule],
  exports: [ZhongliPlanetBefallContainerComponent],
})
export class ZhongliPlanetBefallModule {}
