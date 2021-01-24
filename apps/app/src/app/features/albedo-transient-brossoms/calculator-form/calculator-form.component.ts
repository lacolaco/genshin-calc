import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { TalentLevel } from '@genshin-calc/core';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CalculatorParams } from '../types';

@Component({
  selector: 'app-albedo-transient-blossoms-calculator-form',
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
      talentLevel: new FormControl<TalentLevel>(),
      def: new FormControl<number>(),
    }),
    damageBonus: new FormGroup({
      elementalDamageBonus: new FormControl<number>(),
      skillDamageBonus: new FormControl<number>(),
      enableGeoResonance: new FormControl<boolean>(),
    }),
    damageReduction: new FormGroup({
      characterLevel: new FormControl<number>(),
      enemyLevel: new FormControl<number>(),
      baseResistance: new FormControl<number>(),
    }),
    critical: new FormGroup({
      criticalRate: new FormControl<number>(),
      criticalDamage: new FormControl<number>(),
    }),
  });

  private readonly onDestroy$ = new Subject();

  ngOnInit() {
    this.form.valueChanges
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(({ skillDamage, damageBonus, damageReduction, critical }) => {
        this.valueChange.emit({
          talentLevel: skillDamage.talentLevel,
          character: {
            level: damageReduction.characterLevel,
            stats: {
              def: skillDamage.def,
              criticalRate: critical.criticalRate,
              criticalDamage: critical.criticalDamage,
            },
            bonus: {
              elementalDamageBonus: damageBonus.elementalDamageBonus,
              enableGeoResonanceBonus: damageBonus.enableGeoResonance,
              attackTypeDamageBonus: damageBonus.skillDamageBonus,
            },
          },
          enemy: {
            level: damageReduction.enemyLevel,
            resistance: {
              baseResistance: damageReduction.baseResistance,
              resistanceBonus: 0,
            },
          },
        });
      });
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }

  setFormValue({ talentLevel, character, enemy }: CalculatorParams) {
    this.form.setValue(
      {
        skillDamage: {
          talentLevel,
          def: character.stats.def,
        },
        damageBonus: {
          elementalDamageBonus: character.bonus.elementalDamageBonus,
          enableGeoResonance: character.bonus.enableGeoResonanceBonus,
          skillDamageBonus: character.bonus.attackTypeDamageBonus,
        },
        damageReduction: {
          characterLevel: character.level,
          enemyLevel: enemy.level,
          baseResistance: enemy.resistance.baseResistance,
        },
        critical: {
          criticalRate: character.stats.criticalRate,
          criticalDamage: character.stats.criticalDamage,
        },
      },
      { emitEvent: false },
    );
  }
}
