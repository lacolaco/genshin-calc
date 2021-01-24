import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessor } from '@ngneat/reactive-forms';

@Component({
  selector: 'ui-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(blur)': 'onTouched()' },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CheckboxComponent,
      multi: true,
    },
  ],
})
export class CheckboxComponent extends ControlValueAccessor<boolean> {
  value = false;
  writeValue(value: boolean): void {
    this.value = value;
  }

  onChecked(checked: boolean) {
    this.onChange && this.onChange(checked);
  }
}
