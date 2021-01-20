import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessor } from '@ngneat/reactive-forms';

@Component({
  selector: 'ui-number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: { '(blur)': 'onTouched()' },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: NumberInputComponent,
      multi: true,
    },
  ],
})
export class NumberInputComponent extends ControlValueAccessor<number> {
  @Input() label = '';

  @Input() min = 0;
  @Input() max?: number;

  value: number | null = null;

  writeValue(value: number): void {
    this.value = value;
  }

  onInputChange(value: number) {
    this.onChange(value);
  }
}
