import { CalculatorParams } from './types';

export interface State {
  calculatorParams: CalculatorParams;
}

export const initialState: State = {
  calculatorParams: {
    talentLevel: 8,
    stats: {
      atk: 2000,
    },
    damageBonus: {
      elementalDamageBonus: 0.15,
      attackTypeDamageBonus: 0.0,
      anyDamageBonus: 0,
    },
    defense: { characterLevel: 80, enemyLevel: 80 },
    resistance: { baseResistance: 0.1, resistanceBonus: 0 },
    critical: { criticalRate: 0.1, criticalDamage: 0.5 },
  },
};
