import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UiCalculatorModule, UiCharacterNavModule, UiFormsModule } from '@genshin-calc/ui';
import { CalculatorFormComponent } from './calculator-form/calculator-form.component';
import { ZhongliPlanetBefallContainerComponent } from './container/container.component';

@NgModule({
  declarations: [ZhongliPlanetBefallContainerComponent, CalculatorFormComponent],
  imports: [CommonModule, ReactiveFormsModule, UiFormsModule, UiCalculatorModule, UiCharacterNavModule],
  exports: [ZhongliPlanetBefallContainerComponent],
})
export class ZhongliPlanetBefallModule {}
