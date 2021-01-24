import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Calculation } from '@genshin-calc/core';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormValues } from '../types';

@Component({
  selector: 'app-ganyu-liutian-archery-calculator-form',
  templateUrl: './calculator-form.component.html',
  styleUrls: ['./calculator-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatorFormComponent implements OnInit, OnDestroy {
  private _value: FormValues | null = null;
  @Input()
  set value(value: FormValues) {
    if (this._value !== value) {
      this._value = value;
      this.form.setValue(value);
    }
  }

  @Input()
  calculation: Calculation | null = null;

  @Output()
  valueChange = new EventEmitter<FormValues>();

  readonly form = new FormGroup<FormValues>({
    skillDamage: new FormGroup({
      talentLevel: new FormControl(),
      atk: new FormControl(),
    }),
    damageBonus: new FormGroup({
      elementalDamageBonus: new FormControl(),
      enableGeoResonance: new FormControl(),
      chargedAttackDamageBonus: new FormControl(),
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
    elementalReaction: new FormGroup({
      enableMeltReaction: new FormControl(),
      elementalMastery: new FormControl(),
      reactionBonus: new FormControl(),
    }),
  });

  private readonly onDestroy$ = new Subject();

  ngOnInit() {
    this.form.value$.pipe(takeUntil(this.onDestroy$)).subscribe(this.valueChange);
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }
}
