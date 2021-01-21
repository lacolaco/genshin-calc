import { TalentLevel } from '@genshincalc/core';

export type FormValues = {
  skillDamage: {
    talentLevel: TalentLevel;
    atk: number;
  };
  damageBonus: {
    elementalDamageBonus: number;
    enableGeoResonance: boolean;
    chargedAttackDamageBonus: number;
  };
  damageReduction: {
    characterLevel: number;
    enemyLevel: number;
    baseResistance: number;
  };
  critical: {
    criticalRate: number;
    criticalDamage: number;
  };
  elementalReaction: {
    enableMeltReaction: boolean;
    elementalMastery: number;
    reactionBonus: number;
  };
};
