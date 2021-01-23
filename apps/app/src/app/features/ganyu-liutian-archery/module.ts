import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UiCalculatorModule, UiFormsModule } from '@genshin-calc/ui';
import { CalculatorFormComponent } from './calculator-form/calculator-form.component';
import { GanyuLiutianArcheryContainerComponent } from './container/container.component';

@NgModule({
  declarations: [GanyuLiutianArcheryContainerComponent, CalculatorFormComponent],
  imports: [CommonModule, ReactiveFormsModule, UiFormsModule, UiCalculatorModule],
  exports: [GanyuLiutianArcheryContainerComponent],
})
export class GanyuLiutianArcheryModule {}
