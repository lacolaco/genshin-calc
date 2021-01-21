import { TalentLevel } from '@genshincalc/core';

export type FormValues = {
  skillDamage: {
    talentLevel: TalentLevel;
    def: number;
  };
  damageBonus: {
    elementalDamageBonus: number;
    enableGeoResonance: boolean;
    skillDamageBonus: number;
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
};
