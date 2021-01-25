import { AmplificationReactionParams, calculateOutgoingDamage, CriticalParams } from '../damage';
import { Calculation, CharacterStats, ElementalReactions, TalentLevel } from '../types';
import { calculateDefenseMutiplier } from '../utils';

export type TalentLevelParams = {
  talentLevel: TalentLevel;
};

export type CharacterParams<Fields> = {
  character: Fields;
};

export type EnemyParams<Fields> = {
  enemy: Fields;
};

export type CharacterStatsParams<P extends keyof CharacterStats> = CharacterParams<{
  stats: Pick<CharacterStats, P>;
}>;
// eslint-disable-next-line @typescript-eslint/ban-types
export type CharacterBonusParams<P = Record<string, number | boolean>> = CharacterParams<{
  bonus: {
    elementalDamageBonus: number;
    enableGeoResonanceBonus: boolean;
    attackTypeDamageBonus: number;
  } & P;
}>;

export type ElementalReactionParams<R extends ElementalReactions> = CharacterStatsParams<'elementalMastery'> & {
  elementalReaction: {
    reaction: ElementalReactions.None | R;
    reactionBonus: number;
  };
};

export type DamageReductionParams = CharacterParams<{ level: number }> &
  EnemyParams<{
    level: number;
    resistance: {
      baseResistance: number;
      resistanceBonus: number;
    };
  }>;

type CalculatorFactory<BaseDamageParams, DamageBonusParams> = {
  getBaseDamage: (params: BaseDamageParams) => number;
  getDamageBonus: (params: DamageBonusParams) => number;
};

export function createCalculator<BaseDamageParams, DamageBonusParams>(
  factory: CalculatorFactory<BaseDamageParams, DamageBonusParams>,
) {
  return (
    params: BaseDamageParams &
      DamageBonusParams &
      DamageReductionParams & {
        critical?: CriticalParams;
        amplificationReaction?: AmplificationReactionParams;
      },
  ): Calculation => {
    const baseDamage = factory.getBaseDamage(params);
    const damageBonus = factory.getDamageBonus(params);
    const outgoingDamage = calculateOutgoingDamage(
      baseDamage,
      damageBonus,
      params.critical,
      params.amplificationReaction,
    );
    const damageReduction = calculateDefenseMutiplier(
      params.character.level,
      params.enemy.level,
      params.enemy.resistance.baseResistance + params.enemy.resistance.resistanceBonus,
    );

    const baseline = outgoingDamage.baseline * damageReduction;
    const critical = outgoingDamage.critical * damageReduction;
    const average = outgoingDamage.average * damageReduction;
    const toInteger = Math.floor;
    return {
      skillDamage: toInteger(baseDamage),
      damageBonus: damageBonus,
      calculatedDamage: {
        baseline: toInteger(baseline),
        critical: toInteger(critical),
        average: toInteger(average),
      },
    };
  };
}
