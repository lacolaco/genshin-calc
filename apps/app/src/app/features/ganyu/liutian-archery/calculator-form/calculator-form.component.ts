import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ElementalReactions, TalentLevel } from '@genshin-calc/core';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CalculatorParams } from '../types';

@Component({
  selector: 'app-ganyu-liutian-archery-calculator-form',
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
    talentLevel: new FormControl<TalentLevel>(),
    characterStats: new FormGroup({
      characterLevel: new FormControl<number>(),
      atk: new FormControl<number>(),
      elementalMastery: new FormControl<number>(),
      criticalRate: new FormControl<number>(),
      criticalDamage: new FormControl<number>(),
    }),
    damageBonus: new FormGroup({
      elementalDamageBonus: new FormControl<number>(),
      attackTypeDamageBonus: new FormControl<number>(),
      anyDamageBonus: new FormControl<number>(),
    }),
    damageReduction: new FormGroup({
      enemyLevel: new FormControl<number>(),
      baseResistance: new FormControl<number>(),
      resistanceBonus: new FormControl<number>(),
    }),
    elementalReaction: new FormGroup({
      enableMeltReaction: new FormControl<boolean>(),
      reactionBonus: new FormControl<number>(),
    }),
  });

  private readonly onDestroy$ = new Subject();

  ngOnInit() {
    this.form.valueChanges
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(({ talentLevel, characterStats, damageBonus, damageReduction, elementalReaction }) => {
        this.valueChange.emit({
          talentLevel: talentLevel,
          stats: {
            atk: characterStats.atk,
          },
          defense: {
            characterLevel: characterStats.characterLevel,
            enemyLevel: damageReduction.enemyLevel,
          },
          resistance: {
            baseResistance: damageReduction.baseResistance,
            resistanceBonus: damageReduction.resistanceBonus,
          },
          critical: {
            criticalRate: characterStats.criticalRate,
            criticalDamage: characterStats.criticalDamage,
          },
          damageBonus: {
            elementalDamageBonus: damageBonus.elementalDamageBonus,
            attackTypeDamageBonus: damageBonus.attackTypeDamageBonus,
            anyDamageBonus: damageBonus.anyDamageBonus,
          },
          amplificationReaction: {
            reaction: elementalReaction.enableMeltReaction ? ElementalReactions.MeltByCryo : ElementalReactions.None,
            elementalMastery: characterStats.elementalMastery,
            reactionBonus: elementalReaction.reactionBonus,
          },
        });
      });
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }

  private setFormValue({
    talentLevel,
    stats,
    damageBonus,
    defense,
    resistance,
    critical,
    amplificationReaction,
  }: CalculatorParams) {
    this.form.setValue(
      {
        talentLevel: talentLevel,
        characterStats: {
          characterLevel: defense?.characterLevel ?? 0,
          atk: stats.atk,
          elementalMastery: amplificationReaction?.elementalMastery ?? 0,
          criticalRate: critical?.criticalRate ?? 0,
          criticalDamage: critical?.criticalDamage ?? 0,
        },
        damageBonus: {
          anyDamageBonus: damageBonus?.anyDamageBonus ?? 0,
          attackTypeDamageBonus: damageBonus?.attackTypeDamageBonus ?? 0,
          elementalDamageBonus: damageBonus?.elementalDamageBonus ?? 0,
        },
        damageReduction: {
          enemyLevel: defense?.enemyLevel ?? 0,
          baseResistance: resistance?.baseResistance ?? 0,
          resistanceBonus: resistance?.resistanceBonus ?? 0,
        },
        elementalReaction: {
          enableMeltReaction: amplificationReaction?.reaction === ElementalReactions.MeltByCryo,
          reactionBonus: amplificationReaction?.reactionBonus ?? 0,
        },
      },
      { emitEvent: false },
    );
  }
}
