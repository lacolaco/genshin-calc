import { ElementalReactions } from '@genshin-calc/core';
import { CalculatorParams } from './types';

export type State = CalculatorParams;

export const initialState: State = {
  talentLevel: 6,
  stats: {
    atk: 1500,
  },
  damageBonus: {
    elementalDamageBonus: 0.35,
    attackTypeDamageBonus: 0.0,
    anyDamageBonus: 0,
  },
  defense: { characterLevel: 80, enemyLevel: 80 },
  resistance: { baseResistance: 0.1, resistanceBonus: 0 },
  critical: { criticalRate: 0.05, criticalDamage: 0.5 },
  amplificationReaction: {
    reaction: ElementalReactions.None,
    elementalMastery: 0,
    reactionBonus: 0,
  },
};
