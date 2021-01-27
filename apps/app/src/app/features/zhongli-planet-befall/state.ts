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
    character: {
      level: 80,
      bonus: {
        elementalDamageBonus: 0.58,
        attackTypeDamageBonus: 0.2,
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
  },
};
