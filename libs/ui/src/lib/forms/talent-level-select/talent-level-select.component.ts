import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
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
  @Input() label = '天賦レベル';

  readonly talentLevelArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15] as const;

  value: number | null = null;

  constructor(private readonly cdRef: ChangeDetectorRef) {
    super();
  }

  writeValue(value: number): void {
    this.value = value;
    this.cdRef.markForCheck();
  }

  onSelect(value: number) {
    this.onChange && this.onChange(value);
  }
}
