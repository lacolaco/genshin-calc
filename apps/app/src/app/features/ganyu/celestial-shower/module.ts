import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UiFormsModule, UiCalculatorModule } from '@genshin-calc/ui';
import { CalculatorFormComponent } from './calculator-form/calculator-form.component';
import { CelestialShowerContainerComponent } from './container.component';

@NgModule({
  declarations: [CelestialShowerContainerComponent, CalculatorFormComponent],
  imports: [CommonModule, ReactiveFormsModule, UiFormsModule, UiCalculatorModule],
})
export class GanyuCelestialShowerModule {}
