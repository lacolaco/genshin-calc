import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessor } from '@ngneat/reactive-forms';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

type NumberInputMode = 'decimal' | 'percent';

function convertInput(value: number, mode: NumberInputMode) {
  switch (mode) {
    case 'decimal': {
      return value.toFixed(0);
    }
    case 'percent': {
      return (value * 100).toFixed(1);
    }
  }
}

function convertOutput(value: number, mode: NumberInputMode) {
  switch (mode) {
    case 'decimal': {
      return value;
    }
    case 'percent': {
      return value / 100;
    }
  }
}

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
export class NumberInputComponent extends ControlValueAccessor<number> implements AfterViewInit, OnDestroy {
  @Input() label = '';

  @Input() min = 0;
  @Input() max?: number;

  @Input() mode: NumberInputMode = 'decimal';

  @ViewChild('input', { static: true }) inputElement: ElementRef<HTMLInputElement>;

  value: string | number | undefined;

  private readonly onDestroy$ = new Subject();

  ngAfterViewInit() {
    fromEvent(this.inputElement.nativeElement, 'input')
      .pipe(takeUntil(this.onDestroy$), debounceTime(300))
      .subscribe((event) => {
        if (event.target) {
          this.onInputChange((event.target as HTMLInputElement).value);
        }
      });
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }

  writeValue(value: number | undefined): void {
    if (!value) {
      this.value = value;
      return;
    }
    const newValue = convertInput(value, this.mode);
    this.value = newValue;
  }

  onInputChange(value: string) {
    if (!this.onChange) {
      return;
    }
    if (!value) {
      this.onChange(0);
      return;
    }
    this.onChange(convertOutput(parseFloat(value), this.mode));
  }
}
