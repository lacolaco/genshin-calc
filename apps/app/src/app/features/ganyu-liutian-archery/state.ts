import { FormValues } from './types';
import { CalculatorContainerState, defaultValues } from '../../shared/calculator';

export type State = CalculatorContainerState<FormValues>;

export const initialState: State = {
  inputValues: {
    skillDamage: {
      talentLevel: defaultValues.talentLebel,
      atk: defaultValues.character.stats.atk,
    },
    damageBonus: {
      enableGeoResonance: defaultValues.character.bonus.enableGeoResonance,
      elementalDamageBonus: defaultValues.character.bonus.elementalDamageBonus,
      chargedAttackDamageBonus: defaultValues.character.bonus.chargedAttackDamageBonus,
    },
    damageReduction: {
      characterLevel: defaultValues.character.level,
      enemyLevel: defaultValues.enemy.level,
      baseResistance: defaultValues.enemy.resistance.baseResistance,
    },
    critical: {
      criticalRate: defaultValues.character.stats.criticalRate,
      criticalDamage: defaultValues.character.stats.criticalDamage,
    },
    elementalReaction: {
      enableMeltReaction: false,
      elementalMastery: defaultValues.character.stats.elementalMastery,
      reactionBonus: 0,
    },
  },
  calculation: null,
};
