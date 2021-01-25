import { ElementalReactions } from './types';

export interface OutgoingDamage {
  readonly baseline: number;
  readonly critical: number;
  readonly average: number;
}

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
  damageBonus: number,
  critical?: CriticalParams,
  amplificationReaction?: AmplificationReactionParams,
): OutgoingDamage {
  const amplificationBonus = amplificationReaction ? calculateAmplificationBonus(amplificationReaction) : 1;
  const baseline = baseDamage * (1 + damageBonus) * amplificationBonus;
  const criticalDamage = critical?.criticalDamage ?? 0;
  const criticalRate = critical?.criticalRate ?? 0;
  return {
    baseline,
    critical: baseline * (1 + criticalDamage),
    average: baseline * (1 + criticalDamage * criticalRate),
  };
}

function calculateAmplificationBonus(amplification: AmplificationReactionParams): number {
  return (
    amplificationReactionMultiplier[amplification.reaction] *
    (1 + calculateAmplifiedReactionEMBonus(amplification.elementalMastery) + amplification.reactionBonus)
  );
}

function calculateAmplifiedReactionEMBonus(elementalMastery: number): number {
  return (25 / 9) * (elementalMastery / (1401 + elementalMastery));
}
