import { BaseDamageBonusParams, BaseDamageReductionParams, BaseSkillDamageParams, CharacterStats, TalentLevel } from '../types';
import { Calculator } from './base';

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

type SkillDamageParams = BaseSkillDamageParams<Pick<CharacterStats, 'def'>>;
type DamageBonusParams = BaseDamageBonusParams & { skillDamageBonus: number };
type DamageReductionParams = BaseDamageReductionParams;

export class AlbedoTransientBlossomsCalculator extends Calculator<SkillDamageParams, DamageBonusParams, DamageReductionParams> {
  protected getSkillDamage({ talentLevel, stats }: SkillDamageParams) {
    return stats.def * skillDamageMap[talentLevel];
  }

  protected getDamageBonusMultiplier({ elementalDamageBonus, enableGeoResonance, skillDamageBonus }: DamageBonusParams) {
    return elementalDamageBonus + skillDamageBonus + (enableGeoResonance ? 0.15 : 0);
  }
}
