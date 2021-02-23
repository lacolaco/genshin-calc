import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UiCalculatorModule, UiCalculatorNavModule, UiFormsModule } from '@genshin-calc/ui';
import { CalculatorFormComponent } from './calculator-form/calculator-form.component';
import { AlbedoTransientBlossomsContainerComponent } from './container/container.component';
import { AlbedoRoutingModule } from './routing.module';

@NgModule({
  declarations: [AlbedoTransientBlossomsContainerComponent, CalculatorFormComponent],
  imports: [
    CommonModule,
    AlbedoRoutingModule,
    ReactiveFormsModule,
    UiFormsModule,
    UiCalculatorModule,
    UiCalculatorNavModule,
  ],
  exports: [AlbedoTransientBlossomsContainerComponent],
})
export class AlbedoTransientBlossomsModule {}
