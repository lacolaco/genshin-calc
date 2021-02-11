import { CharacterStatsParams, TalentLevelParams } from '../types';
import { createCalculator } from './factory';

const nightriderOzDamageMap = [88.8, 95.5, 102, 111, 118, 124, 133, 142, 151, 160, 169, 178, 189, 189, 189];

export const calculateFischlNightriderOz = createCalculator({
  getBaseDamage({ talentLevel, stats }: TalentLevelParams & CharacterStatsParams<'atk'>) {
    const skillDamage = nightriderOzDamageMap[talentLevel - 1];
    return stats.atk * (skillDamage / 100);
  },
});
