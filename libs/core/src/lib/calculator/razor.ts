import { CharacterStatsParams, createCalculator, TalentLevelParams } from './factory';

const normalAttackSkillDamageMap = [
  [95.9, 82.6, 103, 136],
  [102, 88.3, 110, 145],
  [109, 93.9, 117, 155],
  [118, 101, 127, 167],
  [124, 107, 134, 176],
  [132, 114, 142, 187],
  [142, 122, 153, 201],
  [152, 131, 163, 215],
  [161, 139, 174, 229],
  [171, 147, 184, 243],
  [181, 156, 195, 257],
  [191, 164, 205, 271],
  [201, 173, 216, 284],
  [210, 181, 227, 298],
  [220, 190, 237, 312],
] as const;

export const calculateRazorSteelFang = createCalculator({
  getBaseDamage({
    talentLevel,
    stats,
    hitCount,
  }: TalentLevelParams &
    CharacterStatsParams<'atk'> & {
      hitCount: 1 | 2 | 3 | 4;
    }) {
    const skillDamage = (normalAttackSkillDamageMap[talentLevel - 1].slice(0, hitCount) as number[]).reduce(
      (acc, cur) => acc + cur,
      0,
    );
    return stats.atk * (skillDamage / 100);
  },
});
