import {
  AmplificationReactionParams,
  calculateIncomingDamage,
  calculateOutgoingDamage,
  CriticalParams,
  DamageBonus,
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

type CalculatorFactory<BaseDamageParams> = {
  getBaseDamage: (params: BaseDamageParams) => number;
};

export function createCalculator<BaseDamageParams>(factory: CalculatorFactory<BaseDamageParams>) {
  return (
    params: BaseDamageParams &
      CharacterParams<{ level: number }> &
      EnemyParams<{
        level: number;
        resistance: {
          baseResistance: number;
          resistanceBonus: number;
        };
      }> & {
        damageBonus: DamageBonus;
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
      calculatedDamage: {
        baseline: toInteger(finalDamage.baseline),
        critical: toInteger(finalDamage.critical),
        average: toInteger(finalDamage.average),
      },
    };
  };
}
