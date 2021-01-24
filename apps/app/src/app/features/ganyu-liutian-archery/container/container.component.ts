import { Component } from '@angular/core';
import { calculateGanyuLiutianArchery, ElementalReactions } from '@genshin-calc/core';
import { RxState } from '@rx-angular/state';
import { initialState, State } from '../state';
import { FormValues } from '../types';
@Component({
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css'],
})
export class GanyuLiutianArcheryContainerComponent extends RxState<State> {
  readonly state$ = this.select();

  constructor() {
    super();
    this.set(initialState);
  }

  onFormValueChange(values: FormValues) {
    const { skillDamage, damageBonus, damageReduction, critical, elementalReaction } = values;
    const calculation = calculateGanyuLiutianArchery({
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
    this.set({ calculation });
  }
}
