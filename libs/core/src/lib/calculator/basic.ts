import { CharacterStatsParams, createCalculator } from './factory';

export const calculateBasicAttack = createCalculator({
  getBaseDamage({ skillDamage, stats }: CharacterStatsParams<'atk'> & { skillDamage: number }) {
    return skillDamage * stats.atk;
  },
});
