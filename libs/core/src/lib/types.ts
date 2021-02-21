export type ElementType = 'geo' | 'cryo';

export const enum ElementalReactions {
  None,
  MeltByCryo,
}

export type CharacterStats = {
  hp: number;
  atk: number;
  def: number;
};

export type TalentLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15;

export type TalentLevelTuple<T> = [T, T, T, T, T, T, T, T, T, T, T, T, T, T, T];

export type CalculatedDamage = {
  baseline: number;
  critical: number;
  average: number;
};

export type Calculation = Readonly<{
  skillDamage: number;
  calculatedDamage: CalculatedDamage;
}>;

export type Calculator<Params> = (params: Params) => Calculation;

export interface Damage {
  readonly baseline: number;
  readonly critical: number;
  readonly average: number;
}

export type TalentLevelParams = {
  talentLevel: TalentLevel;
};

export type CharacterStatsParams<P extends keyof CharacterStats> = {
  stats: Pick<CharacterStats, P>;
};

export type DamageBonusParams = {
  readonly elementalDamageBonus?: number;
  readonly attackTypeDamageBonus?: number;
  readonly anyDamageBonus?: number;
};

export interface CriticalParams {
  readonly criticalRate: number;
  readonly criticalDamage: number;
}

export interface AmplificationReactionParams {
  readonly reaction: ElementalReactions;
  readonly elementalMastery?: number;
  readonly reactionBonus?: number;
}

export interface DefenseReductionParams {
  readonly characterLevel: number;
  readonly enemyLevel: number;
  readonly defenseBonus?: number;
}

export interface ResistanceReductionParams {
  readonly baseResistance: number;
  readonly resistanceBonus?: number;
}

export type RecursiveNonNullable<T> = T extends Record<string, unknown>
  ? {
      [K in keyof T]-?: RecursiveNonNullable<T[K]>;
    }
  : NonNullable<T>;
