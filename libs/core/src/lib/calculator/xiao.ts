import { TalentLevelParams, CharacterStatsParams } from '../types';
import { createCalculator, createTalentLevelMap } from './factory';

/**
 * Lemniscatic Wind Cycling
 */
export const calculateXiaoSkillDamage = createCalculator({
  getBaseDamage({ talentLevel, stats }: TalentLevelParams & CharacterStatsParams<'atk'>) {
    const skillDamage = createTalentLevelMap([253, 272, 291, 316, 335, 354, 379, 404, 430, 455, 480, 506, 537]);

    return (skillDamage[talentLevel] / 100) * stats.atk;
  },
});
