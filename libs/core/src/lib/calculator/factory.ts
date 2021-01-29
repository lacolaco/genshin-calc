import {
  AmplificationReactionParams,
  calculateIncomingDamage,
  calculateOutgoingDamage,
  CriticalParams,
  DamageBonusParams,
  DefenseReductionParams,
  ResistanceReductionParams,
} from '../damage';
import { Calculation, CharacterStats, TalentLevel } from '../types';

export type TalentLevelParams = {
  talentLevel: TalentLevel;
};

export type CharacterStatsParams<P extends keyof CharacterStats> = {
  stats: Pick<CharacterStats, P>;
};

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
      params.damageBonus,
      params.critical,
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
