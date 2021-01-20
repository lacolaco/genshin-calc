import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberInputComponent } from './number-input/number-input.component';
import { ControlLabelComponent } from './control-label/control-label.component';
import { TalentLevelSelectComponent } from './talent-level-select/talent-level-select.component';
import { FormFieldsComponent } from './form-fields/form-fields.component';
import { CheckboxComponent } from './checkbox/checkbox.component';

@NgModule({
  declarations: [NumberInputComponent, ControlLabelComponent, TalentLevelSelectComponent, FormFieldsComponent, CheckboxComponent],
  imports: [CommonModule],
  exports: [NumberInputComponent, ControlLabelComponent, TalentLevelSelectComponent, FormFieldsComponent, CheckboxComponent],
})
export class UiFormsModule {}
