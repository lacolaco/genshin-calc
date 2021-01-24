import { CalculatorParams } from './types';

export interface State {
  calculatorParams: CalculatorParams;
}

export const initialState: State = {
  calculatorParams: {
    talentLevel: 6,
    character: {
      level: 80,
      stats: {
        atk: 1500,
        hp: 25000,
        criticalRate: 0.1,
        criticalDamage: 0.5,
      },
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
  },
};
