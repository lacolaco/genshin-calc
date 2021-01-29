import { CharacterStatsParams, createCalculator, TalentLevelParams } from './factory';

const riffRevolutionMap = [
  3.41,
  3.66,
  3.92,
  4.26,
  4.52,
  4.77,
  5.11,
  5.45,
  5.79,
  6.13,
  6.48,
  6.82,
  7.24,
  7.67,
  8.09,
] as const;

export const calculateXinyanRiffRevolution = createCalculator({
  getBaseDamage({ talentLevel, stats }: TalentLevelParams & CharacterStatsParams<'atk'>) {
    return riffRevolutionMap[talentLevel - 1] * stats.atk;
  },
});
