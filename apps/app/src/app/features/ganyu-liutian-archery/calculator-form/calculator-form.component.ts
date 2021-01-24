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
          character: {
            level: damageReduction.characterLevel,
            stats: {
              atk: skillDamage.atk,
              elementalMastery: elementalReaction.elementalMastery,
              criticalRate: critical.criticalRate,
              criticalDamage: critical.criticalDamage,
            },
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
          elementalReaction: {
            reaction: elementalReaction.enableMeltReaction ? ElementalReactions.MeltByCryo : ElementalReactions.None,
            reactionBonus: elementalReaction.reactionBonus,
          },
        });
      });
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }

  private setFormValue({ talentLevel, character, enemy, elementalReaction }: CalculatorParams) {
    this.form.setValue(
      {
        skillDamage: {
          talentLevel: talentLevel,
          atk: character.stats.atk,
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
          criticalRate: character.stats.criticalRate,
          criticalDamage: character.stats.criticalDamage,
        },
        elementalReaction: {
          elementalMastery: character.stats.elementalMastery,
          enableMeltReaction: elementalReaction.reaction === ElementalReactions.MeltByCryo,
          reactionBonus: elementalReaction.reactionBonus,
        },
      },
      { emitEvent: false },
    );
  }
}
