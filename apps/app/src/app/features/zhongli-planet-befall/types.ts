import { TalentLevel } from '@genshin-calc/core';

export type FormValues = {
  skillDamage: {
    talentLevel: TalentLevel;
    atk: number;
    hp: number;
  };
  damageBonus: {
    elementalDamageBonus: number;
    burstDamageBonus: number;

    enableGeoResonance: boolean;
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
