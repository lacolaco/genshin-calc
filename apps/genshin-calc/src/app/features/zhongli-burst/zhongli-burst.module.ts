import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UiFormsModule } from '@genshin-calc/ui';
import { CalculatorFormComponent } from './calculator-form/calculator-form.component';
import { ZhongliBurstContainerComponent } from './zhongli-burst-container/zhongli-burst-container.component';

@NgModule({
  declarations: [ZhongliBurstContainerComponent, CalculatorFormComponent],
  imports: [CommonModule, ReactiveFormsModule, UiFormsModule],
  exports: [ZhongliBurstContainerComponent],
})
export class ZhongliBurstModule {}
