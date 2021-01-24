import { Component } from '@angular/core';
import { calculateAlbedoTransientBlossoms } from '@genshin-calc/core';
import { RxState } from '@rx-angular/state';
import { initialState, State } from '../state';
import { FormValues } from '../types';

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
    const calculation = calculateAlbedoTransientBlossoms({
      talentLevel: skillDamage.talentLevel,
      character: {
        level: damageReduction.characterLevel,
        stats: {
          def: skillDamage.def,
          criticalRate: critical.criticalRate / 100,
          criticalDamage: critical.criticalDamage / 100,
        },
        bonus: {
          elementalDamageBonus: damageBonus.elementalDamageBonus / 100,
          enableGeoResonanceBonus: damageBonus.enableGeoResonance,
          attackTypeDamageBonus: damageBonus.skillDamageBonus / 100,
        },
      },
      enemy: {
        level: damageReduction.enemyLevel,
        resistance: {
          baseResistance: damageReduction.baseResistance / 100,
          resistanceBonus: 0,
        },
      },
    });
    this.set({ calculation });
  }
}
