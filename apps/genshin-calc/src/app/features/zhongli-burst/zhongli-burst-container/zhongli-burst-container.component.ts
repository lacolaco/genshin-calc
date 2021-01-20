import { Component } from '@angular/core';
import { ZhongliBurstCalculator } from '@genshincalc/core';
import { RxState } from '@rx-angular/state';
import { initialState, State } from '../state';
import { FormValues } from '../types';

const calculator = new ZhongliBurstCalculator();

@Component({
  selector: 'app-zhongli-burst-container',
  templateUrl: './zhongli-burst-container.component.html',
  styleUrls: ['./zhongli-burst-container.component.css'],
})
export class ZhongliBurstContainerComponent extends RxState<State> {
  readonly state$ = this.select();

  constructor() {
    super();
    this.set(initialState);
  }

  onFormValueChange(values: FormValues) {
    const { skillDamage, damageBonus, damageReduction, critical } = values;
    const result = calculator.calc({
      skillDamage: {
        talentLevel: skillDamage.talentLevel,
        stats: {
          atk: skillDamage.atk,
          hp: skillDamage.hp,
        },
      },
      damageBonus: {
        elementalDamageBonus: damageBonus.elementalDamageBonus / 100,
        burstDamageBonus: damageBonus.burstDamageBonus / 100,
        enableGeoResonance: damageBonus.enableGeoResonance,
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
    });
    setTimeout(() => {
      this.set({ calculation: result });
    });
  }
}
