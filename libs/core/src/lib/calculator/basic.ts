import { CharacterStatsParams } from '../types';
import { createCalculator } from './factory';

export const calculateBasicAttack = createCalculator({
  getBaseDamage({ skillDamage, stats }: CharacterStatsParams<'atk'> & { skillDamage: number }) {
    return skillDamage * stats.atk;
  },
});
