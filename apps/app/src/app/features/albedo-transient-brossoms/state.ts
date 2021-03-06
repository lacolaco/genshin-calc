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
    damageBonus: {
      elementalDamageBonus: 0.15,
      attackTypeDamageBonus: 0,
      anyDamageBonus: 0.15,
    },
    defense: { characterLevel: 80, enemyLevel: 80 },
    resistance: { baseResistance: 0.1, resistanceBonus: 0 },
    critical: { criticalRate: 0.05, criticalDamage: 0.5 },
  },
};
