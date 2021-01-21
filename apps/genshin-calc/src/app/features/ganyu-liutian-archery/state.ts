import { Calculation } from '@genshincalc/core';
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
    },
    damageBonus: {
      elementalDamageBonus: 50,
      enableGeoResonance: false,
      chargedAttackDamageBonus: 35,
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
    elementalReaction: {
      enableMeltReaction: false,
      elementalMastery: 50,
      reactionBonus: 0,
    },
  },
  calculation: null,
};
