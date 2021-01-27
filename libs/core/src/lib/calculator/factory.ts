import {
  AmplificationReactionParams,
  calculateIncomingDamage,
  calculateOutgoingDamage,
  CriticalParams,
} from '../damage';
import { Calculation, CharacterStats, TalentLevel } from '../types';

export type TalentLevelParams = {
  talentLevel: TalentLevel;
};

export type CharacterParams<Fields> = {
  character: Fields;
};

export type EnemyParams<Fields> = {
  enemy: Fields;
};

export type CharacterStatsParams<P extends keyof CharacterStats> = {
  stats: Pick<CharacterStats, P>;
};
// eslint-disable-next-line @typescript-eslint/ban-types
export type CharacterBonusParams<P = Record<string, number | boolean>> = CharacterParams<{
  bonus: {
    elementalDamageBonus: number;
    enableGeoResonanceBonus: boolean;
    attackTypeDamageBonus: number;
  } & P;
}>;

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
    const finalDamage = calculateIncomingDamage(
      outgoingDamage,
      {
        characterLevel: params.character.level,
        enemyLevel: params.enemy.level,
        defenseBonus: 0,
      },
      params.enemy.resistance,
    );

    const toInteger = Math.floor;
    return {
      skillDamage: toInteger(baseDamage),
      damageBonus: damageBonus,
      calculatedDamage: {
        baseline: toInteger(finalDamage.baseline),
        critical: toInteger(finalDamage.critical),
        average: toInteger(finalDamage.average),
      },
    };
  };
}
