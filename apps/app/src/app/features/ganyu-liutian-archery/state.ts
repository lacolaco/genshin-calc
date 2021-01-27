import { ElementalReactions } from '@genshin-calc/core';
import { CalculatorParams } from './types';

export type State = {
  calculatorParams: CalculatorParams;
};

export const initialState: State = {
  calculatorParams: {
    talentLevel: 6,
    stats: {
      atk: 1500,
    },
    character: {
      level: 80,
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
    critical: { criticalRate: 0.1, criticalDamage: 0.5 },
    amplificationReaction: {
      reaction: ElementalReactions.None,
      elementalMastery: 50,
      reactionBonus: 0,
    },
  },
};
