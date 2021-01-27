import { TalentLevel } from '../types';
import { CharacterBonusParams, CharacterStatsParams, createCalculator, TalentLevelParams } from './factory';

const skillDamageMap: Record<TalentLevel, number> = {
  1: 1.34,
  2: 1.44,
  3: 1.54,
  4: 1.67,
  5: 1.77,
  6: 1.87,
  7: 2.0,
  8: 2.14,
  9: 2.27,
  10: 2.4,
  11: 2.54,
  12: 2.67,
  13: 2.84,
  14: 3.01,
  15: 3.17,
} as const;

export const calculateAlbedoTransientBlossoms = createCalculator({
  getBaseDamage: ({ talentLevel, character }: TalentLevelParams & CharacterStatsParams<'def'>) => {
    return character.stats.def * skillDamageMap[talentLevel];
  },
  getDamageBonus: ({ character }: CharacterBonusParams) => {
    return (
      character.bonus.elementalDamageBonus +
      character.bonus.attackTypeDamageBonus +
      (character.bonus.enableGeoResonanceBonus ? 0.15 : 0)
    );
  },
});
