import { TalentLevel } from '../types';
import { CharacterBonusParams, CharacterStatsParams, createCalculator, TalentLevelParams } from './base';

const skillDamageMap: Record<TalentLevel, number> = {
  1: 4.01,
  2: 4.44,
  3: 4.88,
  4: 5.42,
  5: 5.91,
  6: 6.4,
  7: 7.05,
  8: 7.7,
  9: 8.35,
  10: 9.0,
  11: 9.65,
  12: 10.3,
  13: 10.84,
  14: 11.38,
  15: 11.92,
} as const;

export const calculateZhongliPlanetBefall = createCalculator({
  getBaseDamage: ({ talentLevel, character }: TalentLevelParams & CharacterStatsParams<'atk' | 'hp'>) => {
    return character.stats.atk * skillDamageMap[talentLevel] + character.stats.hp * 0.33;
  },
  getDamageBonus: ({ character }: CharacterBonusParams) => {
    return (
      character.bonus.elementalDamageBonus +
      character.bonus.attackTypeDamageBonus +
      (character.bonus.enableGeoResonanceBonus ? 0.15 : 0)
    );
  },
});
