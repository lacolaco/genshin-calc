import { Calculation, CriticalDamageParams } from '../types';
import { BaseSkillDamageParams } from '../types';

type BaseParams = { critical: CriticalDamageParams };

export abstract class Calculator<SDP extends BaseSkillDamageParams, DamageBonusParams, DamageReductionParams> {
  protected abstract getSkillDamage(params: SDP): number;
  protected abstract getDamageBonus(params: DamageBonusParams): number;
  protected abstract getDamageReduction(params: DamageReductionParams): number;

  calc(params: BaseParams & { skillDamage: SDP; damageBonus: DamageBonusParams; damageReduction: DamageReductionParams }): Calculation {
    const skillDamage = this.getSkillDamage(params.skillDamage);
    const damageBonus = this.getDamageBonus(params.damageBonus);
    const damageReduction = this.getDamageReduction(params.damageReduction);
    const baseline = skillDamage * (1 + damageBonus) * (1 - damageReduction);
    const critical = baseline * (1 + params.critical.criticalDamage);
    const average = baseline * (1 + params.critical.criticalDamage * params.critical.criticalRate);
    const toInteger = Math.floor;
    return {
      skillDamage: toInteger(skillDamage),
      damageBonus: damageBonus,
      result: {
        baseline: toInteger(baseline),
        critical: toInteger(critical),
        average: toInteger(average),
      },
    };
  }
}
