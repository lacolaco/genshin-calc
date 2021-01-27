import { ElementalReactions } from './types';

export interface Damage {
  readonly baseline: number;
  readonly critical: number;
  readonly average: number;
}

export type DamageBonus = {
  elementalDamageBonus?: number;
  attackTypeDamageBonus?: number;
  anyDamageBonus?: number;
};

export interface CriticalParams {
  readonly criticalRate: number;
  readonly criticalDamage: number;
}

export interface AmplificationReactionParams {
  readonly reaction: ElementalReactions;
  readonly elementalMastery: number;
  readonly reactionBonus: number;
}

const amplificationReactionMultiplier: Record<ElementalReactions, number> = {
  [ElementalReactions.None]: 1,
  [ElementalReactions.MeltByCryo]: 1.5,
};

export function calculateOutgoingDamage(
  baseDamage: number,
  damageBonus: DamageBonus,
  critical?: CriticalParams,
  amplificationReaction?: AmplificationReactionParams,
): Damage {
  const amplificationBonus = amplificationReaction ? calculateAmplificationBonus(amplificationReaction) : 1;
  const baseline = baseDamage * (1 + calculateDamageBonus(damageBonus)) * amplificationBonus;
  const criticalDamage = critical?.criticalDamage ?? 0;
  const criticalRate = critical?.criticalRate ?? 0;
  return {
    baseline,
    critical: baseline * (1 + criticalDamage),
    average: baseline * (1 + criticalDamage * criticalRate),
  };
}

function calculateDamageBonus({
  anyDamageBonus = 0,
  attackTypeDamageBonus = 0,
  elementalDamageBonus = 0,
}: DamageBonus): number {
  return anyDamageBonus + attackTypeDamageBonus + elementalDamageBonus;
}

function calculateAmplificationBonus(amplification: AmplificationReactionParams): number {
  return (
    amplificationReactionMultiplier[amplification.reaction] *
    (1 + calculateAmplifiedReactionEMBonus(amplification.elementalMastery) + amplification.reactionBonus)
  );
}

/**
 * Calculate EM bonus
 * @param elementalMastery
 */
function calculateAmplifiedReactionEMBonus(elementalMastery: number): number {
  return (25 / 9) * (elementalMastery / (1400 + elementalMastery));
}

export interface DefenseReductionParams {
  readonly characterLevel: number;
  readonly enemyLevel: number;
  readonly defenseBonus: number;
}

export interface ResistanceReductionParams {
  readonly baseResistance: number;
  readonly resistanceBonus: number;
}

export function calculateIncomingDamage(
  outgoingDamage: Damage,
  defense: DefenseReductionParams,
  resistance: ResistanceReductionParams,
): Damage {
  const defenseReduction = calculateDefenseReduction(defense);
  const resistanceReduction = calculateResistanceReduction(resistance);

  const reduceDamage = (damage: number) => damage * (1 - defenseReduction) * (1 - resistanceReduction);
  return {
    baseline: reduceDamage(outgoingDamage.baseline),
    critical: reduceDamage(outgoingDamage.critical),
    average: reduceDamage(outgoingDamage.average),
  };
}

function calculateDefenseReduction({ characterLevel, enemyLevel, defenseBonus }: DefenseReductionParams): number {
  return 1 / (1 + (characterLevel + 100) / ((1 + defenseBonus) * (enemyLevel + 100)));
}

function calculateResistanceReduction({ baseResistance, resistanceBonus }: ResistanceReductionParams): number {
  const res = baseResistance + resistanceBonus;
  if (res < 0) {
    return res / 2;
  }
  if (res >= 0.75) {
    return 1 / (1 + 1 / (4 * res));
  }
  return res;
}
