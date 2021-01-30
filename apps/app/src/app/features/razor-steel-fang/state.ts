import { CalculatorParams } from './types';

export interface State {
  calculatorParams: CalculatorParams;
}

export const initialState: State = {
  calculatorParams: {
    talentLevel: 8,
    hitCount: 3,
    stats: {
      atk: 1500,
    },
    damageBonus: {
      elementalDamageBonus: 0,
      attackTypeDamageBonus: 0.35,
      anyDamageBonus: 0.1,
    },
    defense: { characterLevel: 80, enemyLevel: 80, defenseBonus: -0.15 },
    resistance: { baseResistance: 0.1, resistanceBonus: -0.4 },
    critical: { criticalRate: 0.05, criticalDamage: 0.5 },
  },
};
