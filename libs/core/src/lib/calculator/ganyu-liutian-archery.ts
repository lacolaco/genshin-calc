import { TalentLevel } from '../types';
import { CharacterBonusParams, CharacterStatsParams, createCalculator, TalentLevelParams } from './factory';

const arrowDamageMap: Record<TalentLevel, number> = {
  1: 1.28,
  2: 1.38,
  3: 1.47,
  4: 1.6,
  5: 1.7,
  6: 1.79,
  7: 1.92,
  8: 2.05,
  9: 2.18,
  10: 2.3,
  11: 2.43,
  12: 2.43,
  13: 2.43,
  14: 2.43,
  15: 2.43,
} as const;

const arrowBloomDamageMap: Record<TalentLevel, number> = {
  1: 2.18,
  2: 2.34,
  3: 2.5,
  4: 2.72,
  5: 2.88,
  6: 3.05,
  7: 3.26,
  8: 3.48,
  9: 3.7,
  10: 3.92,
  11: 4.13,
  12: 4.13,
  13: 4.13,
  14: 4.13,
  15: 4.13,
} as const;

export const calculateGanyuLiutianArchery = createCalculator({
  getBaseDamage: ({ talentLevel, character }: TalentLevelParams & CharacterStatsParams<'atk'>) => {
    return character.stats.atk * (arrowDamageMap[talentLevel] + arrowBloomDamageMap[talentLevel]);
  },
  getDamageBonus: ({ character }: CharacterBonusParams) => {
    return (
      character.bonus.elementalDamageBonus +
      character.bonus.attackTypeDamageBonus +
      (character.bonus.enableGeoResonanceBonus ? 0.15 : 0)
    );
  },
});
