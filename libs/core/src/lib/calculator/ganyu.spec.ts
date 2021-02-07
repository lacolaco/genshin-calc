import { ElementalReactions } from '../types';
import { calculateGanyuLiutianArchery, calculateGanyuCelestialShower } from './ganyu';

describe('calculateGanyuLiutianArchery', () => {
  const baseParams: Parameters<typeof calculateGanyuLiutianArchery>[0] = {
    talentLevel: 1,
    stats: {
      atk: 1000,
    },
    damageBonus: {},
    resistance: { baseResistance: 0, resistanceBonus: 0 },
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

  test('Close to real damage', () => {
    const { calculatedDamage } = calculateGanyuLiutianArchery({
      talentLevel: 8,
      stats: { atk: 1317 },
      critical: { criticalRate: 0.251, criticalDamage: 1.476 },
      damageBonus: { elementalDamageBonus: 0.391 },
      defense: { characterLevel: 80, enemyLevel: 76 },
      resistance: { baseResistance: 0.1, resistanceBonus: -0.15 },
    });
    expect(calculatedDamage.critical).toBeWithinErrorMargin(4814 + 8184);
  });
});

describe('calculateGanyuCelestialShower', () => {
  const baseParams: Parameters<typeof calculateGanyuCelestialShower>[0] = {
    talentLevel: 1,
    stats: {
      atk: 1000,
    },
    damageBonus: {},
    resistance: { baseResistance: 0, resistanceBonus: 0 },
    defense: { characterLevel: 1, enemyLevel: 1 },
    critical: { criticalRate: 0, criticalDamage: 0 },
    amplificationReaction: {
      reaction: ElementalReactions.None,
      elementalMastery: 0,
      reactionBonus: 0,
    },
  };

  test('スキルダメージはATKに依存する', () => {
    const calc1 = calculateGanyuCelestialShower({ ...baseParams });
    const calc2 = calculateGanyuCelestialShower({
      ...baseParams,
      stats: { ...baseParams.stats, atk: 2000 },
    });
    expect(calc2.skillDamage).toBeGreaterThan(calc1.skillDamage);
  });

  test('Close to real damage', () => {
    const { calculatedDamage } = calculateGanyuCelestialShower({
      talentLevel: 7,
      stats: { atk: 1857 },
      critical: { criticalRate: 0.251, criticalDamage: 2.022 },
      damageBonus: { elementalDamageBonus: 0.391 },
      defense: { characterLevel: 80, enemyLevel: 85 },
      resistance: { baseResistance: 0.1, resistanceBonus: 0 },
    });
    expect(calculatedDamage.critical).toBeWithinErrorMargin(3651);
  });
});
