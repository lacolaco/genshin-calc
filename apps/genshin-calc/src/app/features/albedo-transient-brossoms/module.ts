import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UiCalculatorModule, UiFormsModule } from '@genshin-calc/ui';
import { CalculatorFormComponent } from './calculator-form/calculator-form.component';
import { AlbedoTransientBlossomsContainerComponent } from './container/container.component';

@NgModule({
  declarations: [AlbedoTransientBlossomsContainerComponent, CalculatorFormComponent],
  imports: [CommonModule, ReactiveFormsModule, UiFormsModule, UiCalculatorModule],
  exports: [AlbedoTransientBlossomsContainerComponent],
})
export class AlbedoTransientBlossomsModule {}
