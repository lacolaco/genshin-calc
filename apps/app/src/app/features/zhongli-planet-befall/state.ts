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
    damageBonus: {
      elementalDamageBonus: 0.15,
      attackTypeDamageBonus: 0.0,
      anyDamageBonus: 0.15,
    },
    defense: { characterLevel: 80, enemyLevel: 80, defenseBonus: 0 },
    resistance: { baseResistance: 0.1, resistanceBonus: -0.4 },
    critical: { criticalRate: 0.1, criticalDamage: 0.5 },
  },
};
