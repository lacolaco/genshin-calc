import { ElementalReactions } from './reactions';

export function getReactionMultipiler(reaction: ElementalReactions): number {
  switch (reaction) {
    case ElementalReactions.MeltByCryo: {
      return 1.5;
    }
    default: {
      return 0;
    }
  }
}
export function calculateDefenseMutiplier(characterLevel: number, enemyLevel: number, resistance: number) {
  const enemyDef = 5 * enemyLevel + 500;
  const defenseReduction = enemyDef / (enemyDef + 5 * characterLevel + 500);
  if (resistance < 0) {
    // (1 - a) * (1 - b / 2)
    return (1 - defenseReduction) * (1 - resistance / 2);
  }
  if (resistance >= 0.75) {
    // (1 - a) / (4 * b + 1)
    return (1 - defenseReduction) / (4 * resistance + 1);
  }
  // (1 - a) * (1 - b)
  return (1 - defenseReduction) * (1 - resistance);
}

export function calculateAmplifiedDamageMultiplier(reaction: ElementalReactions, elementalMastery: number, reactionBonus: number) {
  const emBonus = (2.78 * elementalMastery) / (1400 + elementalMastery);
  return getReactionMultipiler(reaction) * (1 + emBonus + reactionBonus);
}
