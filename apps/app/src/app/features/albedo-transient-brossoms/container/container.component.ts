import { Component } from '@angular/core';
import { AlbedoTransientBlossomsCalculator } from '@genshin-calc/core';
import { RxState } from '@rx-angular/state';
import { initialState, State } from '../state';
import { FormValues } from '../types';

const calculator = new AlbedoTransientBlossomsCalculator();

@Component({
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css'],
})
export class AlbedoTransientBlossomsContainerComponent extends RxState<State> {
  readonly state$ = this.select();

  constructor() {
    super();
    this.set(initialState);
  }

  onFormValueChange(values: FormValues) {
    const { skillDamage, damageBonus, damageReduction, critical } = values;
    const calculation = calculator.calc({
      skillDamage: {
        talentLevel: skillDamage.talentLevel,
        stats: {
          def: skillDamage.def,
        },
      },
      damageBonus: {
        elementalDamageBonus: damageBonus.elementalDamageBonus / 100,
        enableGeoResonance: damageBonus.enableGeoResonance,
        skillDamageBonus: damageBonus.skillDamageBonus / 100,
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
    this.set({ calculation });
  }
}
