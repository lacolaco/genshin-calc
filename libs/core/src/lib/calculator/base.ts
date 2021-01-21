import { ElementalReactions } from '../reactions';
import {
  BaseDamageBonusParams,
  BaseDamageReductionParams,
  ElementalReactionParams,
  BaseSkillDamageParams,
  Calculation,
  CriticalDamageParams,
} from '../types';
import { calculateAmplifiedDamageMultiplier, calculateDefenseMutiplier } from '../utils';

type BaseParams = { critical: CriticalDamageParams; elementalReaction?: ElementalReactionParams };

export abstract class Calculator<SDP extends BaseSkillDamageParams, DBP extends BaseDamageBonusParams, DRP extends BaseDamageReductionParams> {
  protected abstract getSkillDamage(params: SDP): number;
  protected abstract getDamageBonusMultiplier(params: DBP): number;
  protected getDamageReductionMultiplier(params: DRP): number {
    return calculateDefenseMutiplier(
      params.characterLevel,
      params.enemyLevel,
      params.baseResistance + params.resistanceBonus - params.resistanceDebuff,
    );
  }

  protected getAmplifiedReaction(): ElementalReactions {
    return ElementalReactions.None;
  }

  calc(params: BaseParams & { skillDamage: SDP; damageBonus: DBP; damageReduction: DRP }): Calculation {
    const skillDamage = this.getSkillDamage(params.skillDamage);
    const damageBonus = this.getDamageBonusMultiplier(params.damageBonus);
    const damageReduction = this.getDamageReductionMultiplier(params.damageReduction);
    const reactionDamageBonus =
      params.elementalReaction && this.getAmplifiedReaction() != ElementalReactions.None
        ? calculateAmplifiedDamageMultiplier(
            this.getAmplifiedReaction(),
            params.elementalReaction.elementalMastery,
            params.elementalReaction.reactionBonus,
          )
        : 1;
    const baseline = skillDamage * (1 + damageBonus) * reactionDamageBonus * damageReduction;
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
