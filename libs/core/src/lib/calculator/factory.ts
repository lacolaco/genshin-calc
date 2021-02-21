import { calculateIncomingDamage, calculateOutgoingDamage } from '../damage';
import {
  AmplificationReactionParams,
  Calculation,
  CriticalParams,
  DamageBonusParams,
  DefenseReductionParams,
  ResistanceReductionParams,
  TalentLevel,
} from '../types';

type CalculatorFactory<BaseDamageParams> = {
  getBaseDamage: (params: BaseDamageParams) => number;
};

export function createCalculator<BaseDamageParams>(factory: CalculatorFactory<BaseDamageParams>) {
  return (
    params: BaseDamageParams & {
      damageBonus?: DamageBonusParams;
      defense?: DefenseReductionParams;
      resistance?: ResistanceReductionParams;
      critical?: CriticalParams;
      amplificationReaction?: AmplificationReactionParams;
    },
  ): Calculation => {
    const baseDamage = factory.getBaseDamage(params);
    const outgoingDamage = calculateOutgoingDamage(
      baseDamage,
      params.critical,
      params.damageBonus,
      params.amplificationReaction,
    );
    const finalDamage = calculateIncomingDamage(outgoingDamage, {
      defense: params.defense,
      resistance: params.resistance,
    });

    const toInteger = Math.floor;
    return {
      skillDamage: toInteger(baseDamage),
      calculatedDamage: {
        baseline: toInteger(finalDamage.baseline),
        critical: toInteger(finalDamage.critical),
        average: toInteger(finalDamage.average),
      },
    };
  };
}

export function createTalentLevelMap<T>(items: T[]): Record<TalentLevel, T> {
  const length = items.length;
  if (length < 15) {
    for (let i = 0; i < 15 - length; i++) {
      items.push(items[length - 1]);
    }
  }
  return items.reduce((acc, cur, i) => ({ ...acc, [i + 1]: cur }), {} as Record<TalentLevel, T>);
}
