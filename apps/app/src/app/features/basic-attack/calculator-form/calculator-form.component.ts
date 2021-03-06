import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { TalentLevel } from '@genshin-calc/core';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CalculatorParams } from '../types';

@Component({
  selector: 'app-xinyan-riff-revolution-calculator-form',
  templateUrl: './calculator-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatorFormComponent implements OnInit, OnDestroy {
  @Input()
  set value(value: CalculatorParams) {
    this.setFormValue(value);
  }

  @Output()
  valueChange = new EventEmitter<CalculatorParams>();

  readonly form = new FormGroup({
    skillDamage: new FormGroup({
      skillDamage: new FormControl<number>(),
      atk: new FormControl<number>(),
    }),
    damageBonus: new FormGroup({
      elementalDamageBonus: new FormControl<number>(),
      attackTypeDamageBonus: new FormControl<number>(),
      anyDamageBonus: new FormControl<number>(),
    }),
    damageReduction: new FormGroup({
      characterLevel: new FormControl<number>(),
      enemyLevel: new FormControl<number>(),
      defenseBonus: new FormControl<number>(),
      baseResistance: new FormControl<number>(),
      resistanceBonus: new FormControl<number>(),
    }),
    critical: new FormGroup({
      criticalRate: new FormControl<number>(),
      criticalDamage: new FormControl<number>(),
    }),
  });

  private readonly onDestroy$ = new Subject();

  ngOnInit() {
    this.form.value$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(({ skillDamage, damageBonus, damageReduction, critical }) => {
        this.valueChange.emit({
          skillDamage: skillDamage.skillDamage,
          stats: {
            atk: skillDamage.atk,
          },
          damageBonus: {
            elementalDamageBonus: damageBonus.elementalDamageBonus,
            attackTypeDamageBonus: damageBonus.attackTypeDamageBonus,
            anyDamageBonus: damageBonus.anyDamageBonus,
          },
          defense: {
            characterLevel: damageReduction.characterLevel,
            enemyLevel: damageReduction.enemyLevel,
            defenseBonus: damageReduction.defenseBonus,
          },
          resistance: {
            baseResistance: damageReduction.baseResistance,
            resistanceBonus: damageReduction.resistanceBonus,
          },
          critical: {
            criticalRate: critical.criticalRate,
            criticalDamage: critical.criticalDamage,
          },
        });
      });
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }

  setFormValue({ stats, skillDamage, damageBonus, defense, resistance, critical }: CalculatorParams) {
    this.form.setValue(
      {
        skillDamage: {
          skillDamage,
          atk: stats.atk,
        },
        damageBonus: {
          attackTypeDamageBonus: damageBonus?.attackTypeDamageBonus ?? 0,
          elementalDamageBonus: damageBonus?.elementalDamageBonus ?? 0,
          anyDamageBonus: damageBonus?.anyDamageBonus ?? 0,
        },
        damageReduction: {
          characterLevel: defense?.characterLevel ?? 0,
          enemyLevel: defense?.enemyLevel ?? 0,
          defenseBonus: defense?.defenseBonus ?? 0,
          baseResistance: resistance?.baseResistance ?? 0,
          resistanceBonus: resistance?.resistanceBonus ?? 0,
        },
        critical: {
          criticalRate: critical?.criticalRate ?? 0,
          criticalDamage: critical?.criticalDamage ?? 0,
        },
      },
      { emitEvent: false },
    );
  }
}
