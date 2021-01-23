import { Component } from '@angular/core';
import { GanyuLiutianArcheryCalculator } from '@genshincalc/core';
import { RxState } from '@rx-angular/state';
import { initialState, State } from '../state';
import { FormValues } from '../types';

const calculator = new GanyuLiutianArcheryCalculator();

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
    const calculation = calculator.calc({
      skillDamage: {
        talentLevel: skillDamage.talentLevel,
        stats: {
          atk: skillDamage.atk,
        },
      },
      damageBonus: {
        elementalDamageBonus: damageBonus.elementalDamageBonus / 100,
        enableGeoResonance: damageBonus.enableGeoResonance,
        chargedAttackDamageBonus: damageBonus.chargedAttackDamageBonus / 100,
      },
      critical: {
        criticalRate: critical.criticalRate / 100,
        criticalDamage: critical.criticalDamage / 100,
      },
      damageReduction: {
        characterLevel: damageReduction.characterLevel,
        enemyLevel: damageReduction.enemyLevel,
        baseResistance: damageReduction.baseResistance / 100,
        resistanceBonus: 0,
        resistanceDebuff: 0,
      },
      elementalReaction: elementalReaction.enableMeltReaction
        ? {
            elementalMastery: elementalReaction.elementalMastery,
            reactionBonus: elementalReaction.reactionBonus / 100,
          }
        : undefined,
    });
    this.set({ calculation });
  }
}
