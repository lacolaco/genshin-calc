import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Calculation } from '@genshincalc/core';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormValues } from '../types';

@Component({
  selector: 'app-zhongli-burst-calculator-form',
  templateUrl: './calculator-form.component.html',
  styleUrls: ['./calculator-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatorFormComponent implements OnInit, OnDestroy {
  @Input()
  value?: FormValues;
  @Input()
  calculation?: Calculation;

  @Output()
  valueChange = new EventEmitter<FormValues>();

  readonly form = new FormGroup<FormValues>({
    skillDamage: new FormGroup({
      talentLevel: new FormControl(),
      atk: new FormControl(),
      hp: new FormControl(),
    }),
    damageBonus: new FormGroup({
      elementalDamageBonus: new FormControl(),
      burstDamageBonus: new FormControl(),
      enableGeoResonance: new FormControl(),
    }),
    damageReduction: new FormGroup({
      characterLevel: new FormControl(),
      enemyLevel: new FormControl(),
      baseResistance: new FormControl(),
    }),
    critical: new FormGroup({
      criticalRate: new FormControl(),
      criticalDamage: new FormControl(),
    }),
  });

  private readonly onDestroy$ = new Subject();

  ngOnInit() {
    if (this.value) {
      this.form.setValue(this.value);
    }
    this.form.value$.pipe(takeUntil(this.onDestroy$)).subscribe(this.valueChange);
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }
}
