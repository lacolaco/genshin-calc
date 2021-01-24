import { ElementalReactions } from '@genshin-calc/core';
import { CalculatorParams } from './types';

export type State = {
  calculatorParams: CalculatorParams;
};

export const initialState: State = {
  calculatorParams: {
    talentLevel: 6,
    character: {
      level: 80,
      stats: {
        atk: 1500,
        elementalMastery: 50,
        criticalRate: 0.1,
        criticalDamage: 0.5,
      },
      bonus: {
        elementalDamageBonus: 0.5,
        attackTypeDamageBonus: 0.35,
        enableGeoResonanceBonus: false,
      },
    },
    enemy: {
      level: 80,
      resistance: {
        baseResistance: 0.1,
        resistanceBonus: 0,
      },
    },
    elementalReaction: {
      reaction: ElementalReactions.None,
      reactionBonus: 0,
    },
  },
};
