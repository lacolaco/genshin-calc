export type CharacterStats = {
  atk: number;
  hp: number;
  def: number;
  em: number;
};

export type CriticalDamageParams = {
  criticalRate: number;
  criticalDamage: number;
};

export type TalentLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15;

export type BaseSkillDamageParams<Stats extends Partial<CharacterStats> = Pick<CharacterStats, 'atk'>> = {
  talentLevel: TalentLevel;
  stats: Stats;
};

export type BaseDamageBonusParams<Override = unknown> = {
  elementalDamageBonus: number;
  enableGeoResonance: boolean;
} & Override;

export type BaseDamageReductionParams<Override = unknown> = {
  characterLevel: number;
  enemyLevel: number;
  baseResistance: number;
  resistanceBonus: number;
  resistanceDebuff: number;
} & Override;

export type Calculation = {
  skillDamage: number;
  damageBonus: number;
  result: {
    baseline: number;
    critical: number;
    average: number;
  };
};
