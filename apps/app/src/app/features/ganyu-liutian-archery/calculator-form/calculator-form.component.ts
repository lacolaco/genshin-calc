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
    skillDamage: new FormGroup({
      talentLevel: new FormControl<TalentLevel>(),
      atk: new FormControl<number>(),
    }),
    damageBonus: new FormGroup({
      elementalDamageBonus: new FormControl<number>(),
      enableGeoResonance: new FormControl<boolean>(),
      chargedAttackDamageBonus: new FormControl<number>(),
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
    elementalReaction: new FormGroup({
      enableMeltReaction: new FormControl<boolean>(),
      elementalMastery: new FormControl<number>(),
      reactionBonus: new FormControl<number>(),
    }),
  });

  private readonly onDestroy$ = new Subject();

  ngOnInit() {
    this.form.valueChanges
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(({ skillDamage, damageBonus, damageReduction, critical, elementalReaction }) => {
        this.valueChange.emit({
          talentLevel: skillDamage.talentLevel,
          stats: {
            atk: skillDamage.atk,
          },
          character: {
            level: damageReduction.characterLevel,
            bonus: {
              elementalDamageBonus: damageBonus.elementalDamageBonus,
              enableGeoResonanceBonus: damageBonus.enableGeoResonance,
              attackTypeDamageBonus: damageBonus.chargedAttackDamageBonus,
            },
          },
          enemy: {
            level: damageReduction.enemyLevel,
            resistance: {
              baseResistance: damageReduction.baseResistance,
              resistanceBonus: 0,
            },
          },
          critical: {
            criticalRate: critical.criticalRate,
            criticalDamage: critical.criticalDamage,
          },
          amplificationReaction: elementalReaction.enableMeltReaction
            ? {
                reaction: ElementalReactions.MeltByCryo,
                elementalMastery: elementalReaction.elementalMastery,
                reactionBonus: elementalReaction.reactionBonus,
              }
            : undefined,
        });
      });
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }

  private setFormValue({ talentLevel, stats, character, enemy, critical, amplificationReaction }: CalculatorParams) {
    this.form.setValue(
      {
        skillDamage: {
          talentLevel: talentLevel,
          atk: stats.atk,
        },
        damageBonus: {
          enableGeoResonance: character.bonus.enableGeoResonanceBonus,
          chargedAttackDamageBonus: character.bonus.attackTypeDamageBonus,
          elementalDamageBonus: character.bonus.elementalDamageBonus,
        },
        damageReduction: {
          characterLevel: character.level,
          enemyLevel: enemy.level,
          baseResistance: enemy.resistance.baseResistance,
        },
        critical: {
          criticalRate: critical?.criticalRate ?? 0,
          criticalDamage: critical?.criticalDamage ?? 0,
        },
        elementalReaction: {
          elementalMastery: amplificationReaction?.elementalMastery ?? 0,
          enableMeltReaction: amplificationReaction != null,
          reactionBonus: amplificationReaction?.reactionBonus ?? 0,
        },
      },
      { emitEvent: false },
    );
  }
}
