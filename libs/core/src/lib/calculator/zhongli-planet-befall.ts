import { BaseDamageBonusParams, BaseDamageReductionParams, BaseSkillDamageParams, CharacterStats, TalentLevel } from '../types';
import { Calculator } from './base';

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

type SkillDamageParams = BaseSkillDamageParams<Pick<CharacterStats, 'atk' | 'hp'>>;
type DamageBonusParams = BaseDamageBonusParams & { burstDamageBonus: number };
type DamageReductionParams = BaseDamageReductionParams;

export class ZhongliPlanetBefallCalculator extends Calculator<SkillDamageParams, DamageBonusParams, DamageReductionParams> {
  protected getSkillDamage({ talentLevel, stats }: SkillDamageParams) {
    return stats.atk * skillDamageMap[talentLevel] + stats.hp * 0.33;
  }

  protected getDamageBonusMultiplier({ elementalDamageBonus, enableGeoResonance, burstDamageBonus }: DamageBonusParams) {
    return elementalDamageBonus + burstDamageBonus + (enableGeoResonance ? 0.15 : 0);
  }
}
