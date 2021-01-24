import { ElementalReactions } from '../types';
import { calculateGanyuLiutianArchery } from './ganyu-liutian-archery';

describe('calculateGanyuLiutianArchery', () => {
  const baseParams: Parameters<typeof calculateGanyuLiutianArchery>[0] = {
    talentLevel: 1,
    character: {
      level: 1,
      stats: {
        atk: 1000,
        elementalMastery: 0,
        criticalRate: 0,
        criticalDamage: 0,
      },
      bonus: {
        elementalDamageBonus: 0,
        attackTypeDamageBonus: 0,
        enableGeoResonanceBonus: false,
      },
    },
    enemy: {
      level: 1,
      resistance: {
        baseResistance: 0,
        resistanceBonus: 0,
      },
    },
    elementalReaction: {
      reaction: ElementalReactions.None,
      reactionBonus: 0,
    },
  } as const;

  test('Calculationを返す', () => {
    const calculation = calculateGanyuLiutianArchery(baseParams);
    expect(calculation).toBeTruthy();
  });

  test('スキルダメージはATKに依存する', () => {
    const calc1 = calculateGanyuLiutianArchery({ ...baseParams });
    const calc2 = calculateGanyuLiutianArchery({
      ...baseParams,
      character: {
        ...baseParams.character,
        stats: { ...baseParams.character.stats, atk: 2000 },
      },
    });
    expect(calc2.skillDamage).toBeGreaterThan(calc1.skillDamage);
  });

  test('ダメージバフを計算する', () => {
    const calc = calculateGanyuLiutianArchery({
      ...baseParams,
      character: {
        ...baseParams.character,
        bonus: {
          elementalDamageBonus: 0.1,
          attackTypeDamageBonus: 0.2,
          enableGeoResonanceBonus: true,
        },
      },
    });
    expect(calc.damageBonus).toBe(0.1 + 0.2 + 0.15);
  });

  test('溶解反応はダメージを1.5倍にする', () => {
    const calc1 = calculateGanyuLiutianArchery({ ...baseParams });
    const calc2 = calculateGanyuLiutianArchery({
      ...baseParams,
      elementalReaction: {
        ...baseParams.elementalReaction,
        reaction: ElementalReactions.MeltByCryo,
      },
    });
    expect(calc2.calculatedDamage.baseline).toBe(calc1.calculatedDamage.baseline * 1.5);
  });
});
