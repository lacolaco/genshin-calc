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
