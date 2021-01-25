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
        def: 1500,
      },
      bonus: {
        elementalDamageBonus: 0.5,
        enableGeoResonanceBonus: false,
        attackTypeDamageBonus: 0.15,
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
