import { TalentLevelParams, CharacterStatsParams, TalentLevel, DamageBonusParams } from '../types';
import { createCalculator, createTalentLevelMap } from './factory';

/**
 * Lemniscatic Wind Cycling
 */
export const calculateXiaoElementalSkillDamage = createCalculator({
  getBaseDamage({ talentLevel, stats }: TalentLevelParams & CharacterStatsParams<'atk'>) {
    const skillDamage = createTalentLevelMap([253, 272, 291, 316, 335, 354, 379, 404, 430, 455, 480, 506, 537]);

    return (skillDamage[talentLevel] / 100) * stats.atk;
  },
});

export const calculateXiaoPlungingAttackDamage = createCalculator({
  getBaseDamage({ talentLevel, stats }: TalentLevelParams & CharacterStatsParams<'atk'>) {
    const skillDamage = createTalentLevelMap([204, 221, 238, 261, 278, 297, 323, 349, 375, 404, 433]);

    return (skillDamage[talentLevel] / 100) * stats.atk;
  },
  getFixedDamageBonusParams(base: DamageBonusParams, params: { burstTalentLevel: TalentLevel }): DamageBonusParams {
    // Bane of All Evil
    const damageBonusFromBurst =
      createTalentLevelMap([
        58.5,
        62.0,
        65.5,
        70.0,
        73.5,
        77.0,
        81.6,
        86.1,
        90.7,
        95.2,
        99.8,
        104.3,
        108.9,
        113.4,
        118,
      ])[params.burstTalentLevel] / 100;
    return {
      ...base,
      attackTypeDamageBonus: (base.attackTypeDamageBonus ?? 0) + damageBonusFromBurst,
    };
  },
});
