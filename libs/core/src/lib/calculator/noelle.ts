import { CharacterStatsParams, createCalculator, TalentLevelParams } from './factory';

const defToAtkBonusMap = [40, 43, 46, 50, 53, 56, 60, 64, 68, 72, 76, 80, 85, 85, 85] as const;

const normalAttackSkillDamageMap = [
  [79.1, 73.4, 86.3, 113],
  [85.6, 79.3, 93.3, 123],
  [92, 85.3, 100, 132],
  [101, 93.8, 110, 145],
  [108, 99.8, 117, 154],
  [115, 107, 125, 165],
  [125, 116, 136, 179],
  [135, 125, 147, 194],
  [145, 135, 158, 208],
  [156, 145, 171, 224],
  [167, 155, 183, 240],
] as const;

export const calculateNoelleSweepingTime = createCalculator({
  getBaseDamage({
    talentLevel,
    stats,
    enableConstellationLv6,
    hitCount,
  }: TalentLevelParams &
    CharacterStatsParams<'atk' | 'def'> & {
      enableConstellationLv6: boolean;
      hitCount: 1 | 2 | 3 | 4;
    }) {
    const skillDamage = (normalAttackSkillDamageMap[talentLevel - 1].slice(0, hitCount) as number[]).reduce(
      (acc, cur) => acc + cur,
      0,
    );
    const atk = stats.atk + (defToAtkBonusMap[talentLevel - 1] / 100 + (enableConstellationLv6 ? 0.5 : 0)) * stats.def;
    return (atk * skillDamage) / 100;
  },
});
