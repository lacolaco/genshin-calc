import { CharacterStats, ElementalReactions, TalentLevel } from '../types';
import { calculateDefenseMutiplier } from '../utils';

export type TalentParams = {
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
export type CriticalParams = CharacterStatsParams<'criticalRate' | 'criticalDamage'>;

type CalculatorFactory<SkillDamageParams, DamageBonusParams, AmplifiedDamageMultiplierParams> = {
  getSkillDamage: (params: SkillDamageParams) => number;
  getDamageBonus: (params: DamageBonusParams) => number;
  getAmplifiedDamageMultiplier?: (params: AmplifiedDamageMultiplierParams) => number;
};

export function createCalculator<SkillDamageParams, DamageBonusMultiplierParams, AmplifiedDamageMultiplierParams>(
  factory: CalculatorFactory<SkillDamageParams, DamageBonusMultiplierParams, AmplifiedDamageMultiplierParams>,
) {
  return (
    params: TalentParams &
      SkillDamageParams &
      DamageBonusMultiplierParams &
      DamageReductionParams &
      AmplifiedDamageMultiplierParams &
      CriticalParams,
  ) => {
    const skillDamage = factory.getSkillDamage(params);
    const damageBonus = factory.getDamageBonus(params);
    const damageReduction = calculateDefenseMutiplier(
      params.character.level,
      params.enemy.level,
      params.enemy.resistance.baseResistance + params.enemy.resistance.resistanceBonus,
    );
    const amplifiedDamageMultiplier = factory.getAmplifiedDamageMultiplier
      ? factory.getAmplifiedDamageMultiplier(params)
      : 1;

    const baseline = skillDamage * (1 + damageBonus) * amplifiedDamageMultiplier * damageReduction;
    const critical = baseline * (1 + params.character.stats.criticalDamage);
    const average = baseline * (1 + params.character.stats.criticalDamage * params.character.stats.criticalRate);
    const toInteger = Math.floor;
    return {
      skillDamage: toInteger(skillDamage),
      damageBonus: damageBonus,
      result: {
        baseline: toInteger(baseline),
        critical: toInteger(critical),
        average: toInteger(average),
      },
    };
  };
}
