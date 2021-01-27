import { ElementalReactions } from '../types';
import { calculateGanyuLiutianArchery } from './ganyu-liutian-archery';

describe('calculateGanyuLiutianArchery', () => {
  const baseParams: Parameters<typeof calculateGanyuLiutianArchery>[0] = {
    talentLevel: 1,
    stats: {
      atk: 1000,
    },
    enemy: {
      resistance: {
        baseResistance: 0,
        resistanceBonus: 0,
      },
    },
    damageBonus: {},
    defense: { characterLevel: 1, enemyLevel: 1 },
    critical: { criticalRate: 0, criticalDamage: 0 },
    amplificationReaction: {
      reaction: ElementalReactions.None,
      elementalMastery: 0,
      reactionBonus: 0,
    },
  };

  test('スキルダメージはATKに依存する', () => {
    const calc1 = calculateGanyuLiutianArchery({ ...baseParams });
    const calc2 = calculateGanyuLiutianArchery({
      ...baseParams,
      stats: { ...baseParams.stats, atk: 2000 },
    });
    expect(calc2.skillDamage).toBeGreaterThan(calc1.skillDamage);
  });

  test('溶解反応はダメージを1.5倍にする', () => {
    const calc1 = calculateGanyuLiutianArchery({ ...baseParams });
    const calc2 = calculateGanyuLiutianArchery({
      ...baseParams,
      amplificationReaction: {
        reaction: ElementalReactions.MeltByCryo,
        elementalMastery: 0,
        reactionBonus: 0,
      },
    });
    expect(calc2.calculatedDamage.baseline).toBe(calc1.calculatedDamage.baseline * 1.5);
  });
});
