import { CalculatorParams } from './types';

export interface State {
  calculatorParams: CalculatorParams;
}

export const initialState: State = {
  calculatorParams: {
    talentLevel: 6,
    stats: {
      atk: 1500,
      hp: 25000,
    },
    enemy: {
      resistance: {
        baseResistance: 0.1,
        resistanceBonus: 0,
      },
    },
    damageBonus: {
      elementalDamageBonus: 0.58,
      attackTypeDamageBonus: 0.2,
      anyDamageBonus: 0,
    },
    defense: { characterLevel: 80, enemyLevel: 80 },
    critical: { criticalRate: 0.1, criticalDamage: 0.5 },
  },
};
