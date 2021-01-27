import { CalculatorParams } from './types';

export type State = {
  calculatorParams: CalculatorParams;
};

export const initialState: State = {
  calculatorParams: {
    talentLevel: 6,
    stats: {
      def: 1500,
    },
    enemy: {
      resistance: {
        baseResistance: 0.1,
        resistanceBonus: 0,
      },
    },
    damageBonus: {
      elementalDamageBonus: 0.5,
      attackTypeDamageBonus: 0.15,
      anyDamageBonus: 0,
    },
    defense: { characterLevel: 80, enemyLevel: 80 },
    critical: { criticalRate: 0.1, criticalDamage: 0.5 },
  },
};
