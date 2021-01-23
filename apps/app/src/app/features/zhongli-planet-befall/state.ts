import { Calculation } from '@genshin-calc/core';
import { FormValues } from './types';

export interface State {
  inputValues: FormValues;
  calculation: Calculation | null;
}

export const initialState: State = {
  inputValues: {
    skillDamage: {
      talentLevel: 6,
      atk: 1500,
      hp: 25000,
    },
    damageBonus: {
      elementalDamageBonus: 50,
      burstDamageBonus: 20,
      enableGeoResonance: false,
    },
    damageReduction: {
      characterLevel: 80,
      enemyLevel: 80,
      baseResistance: 10,
    },
    critical: {
      criticalRate: 10,
      criticalDamage: 50,
    },
  },
  calculation: null,
};
