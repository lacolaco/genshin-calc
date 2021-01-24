import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessor } from '@ngneat/reactive-forms';

@Component({
  selector: 'ui-talent-level-select',
  templateUrl: './talent-level-select.component.html',
  styleUrls: ['./talent-level-select.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    '(blur)': 'onTouch()',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TalentLevelSelectComponent,
      multi: true,
    },
  ],
})
export class TalentLevelSelectComponent extends ControlValueAccessor<number> {
  readonly talentLevelArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15] as const;

  value: number | null = null;

  writeValue(value: number): void {
    this.value = value;
  }

  onSelect(value: number) {
    this.onChange && this.onChange(value);
  }
}
