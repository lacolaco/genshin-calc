import {
  AmplificationReactionParams,
  CriticalParams,
  Damage,
  DamageBonusParams,
  DefenseReductionParams,
  ElementalReactions,
  ResistanceReductionParams,
} from './types';

const amplificationReactionMultiplier: Record<ElementalReactions, number> = {
  [ElementalReactions.None]: 1,
  [ElementalReactions.MeltByCryo]: 1.5,
};

export function calculateOutgoingDamage(
  baseDamage: number,
  critical?: CriticalParams,
  damageBonus?: DamageBonusParams,
  amplificationReaction?: AmplificationReactionParams,
): Damage {
  const damageBonusMultiplier = damageBonus ? 1 + calculateDamageBonus(damageBonus) : 1;
  const amplificationBonus = amplificationReaction ? calculateAmplificationBonus(amplificationReaction) : 1;
  const baseline = baseDamage * damageBonusMultiplier * amplificationBonus;
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
}: DamageBonusParams): number {
  return anyDamageBonus + attackTypeDamageBonus + elementalDamageBonus;
}

function calculateAmplificationBonus({
  reaction,
  elementalMastery = 0,
  reactionBonus = 0,
}: AmplificationReactionParams): number {
  return (
    amplificationReactionMultiplier[reaction] *
    (1 + calculateAmplifiedReactionEMBonus(elementalMastery) + reactionBonus)
  );
}

/**
 * Calculate EM bonus
 * @param elementalMastery
 */
function calculateAmplifiedReactionEMBonus(elementalMastery: number): number {
  return (25 / 9) * (elementalMastery / (1400 + elementalMastery));
}

export function calculateIncomingDamage(
  outgoingDamage: Damage,
  params: {
    defense?: DefenseReductionParams;
    resistance?: ResistanceReductionParams;
  } = {},
): Damage {
  const defenseReductionMultipler = params.defense ? 1 - calculateDefenseReduction(params.defense) : 0.5;
  const resistanceReductionMultiplier = params.resistance ? 1 - calculateResistanceReduction(params.resistance) : 1;

  const reduceDamage = (damage: number) => damage * defenseReductionMultipler * resistanceReductionMultiplier;
  return {
    baseline: reduceDamage(outgoingDamage.baseline),
    critical: reduceDamage(outgoingDamage.critical),
    average: reduceDamage(outgoingDamage.average),
  };
}

function calculateDefenseReduction({ characterLevel, enemyLevel, defenseBonus = 0 }: DefenseReductionParams): number {
  return 1 / (1 + (characterLevel + 100) / ((1 + defenseBonus) * (enemyLevel + 100)));
}

function calculateResistanceReduction({ baseResistance, resistanceBonus = 0 }: ResistanceReductionParams): number {
  const res = baseResistance + resistanceBonus;
  if (res < 0) {
    return res / 2;
  }
  if (res >= 0.75) {
    return 1 / (1 + 1 / (4 * res));
  }
  return res;
}
