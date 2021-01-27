import { calculateZhongliPlanetBefall } from './zhongli-planet-befall';

export function expectDamage(actual: number, expected: number) {
  const delta = expected * 0.01;
  expect(actual).toBeLessThanOrEqual(expected + delta);
  expect(actual).toBeGreaterThanOrEqual(expected - delta);
}

describe('burst damage', () => {
  test('case 1: minimal', () => {
    const { calculatedDamage } = calculateZhongliPlanetBefall({
      talentLevel: 7,
      stats: {
        hp: 14289,
        atk: 259,
      },
      enemy: {
        resistance: {
          baseResistance: 0.1,
          resistanceBonus: 0,
        },
      },
      damageBonus: {
        elementalDamageBonus: 0.216,
      },
      defense: { characterLevel: 80, enemyLevel: 77 },
      critical: { criticalRate: 0.05, criticalDamage: 0.5 },
    });

    expectDamage(calculatedDamage.baseline, 3609);
    expect(calculatedDamage.critical).toBeCloseTo(3609 * 1.5, -1);
    expect(calculatedDamage.average).toBeCloseTo(3609 * (1 + 0.05 * 0.5), -1);
  });

  test('case 2: no buff', () => {
    const { calculatedDamage } = calculateZhongliPlanetBefall({
      talentLevel: 7,
      stats: {
        hp: 24782,
        atk: 1305,
      },
      enemy: {
        resistance: {
          baseResistance: 0.1,
          resistanceBonus: 0,
        },
      },
      damageBonus: {
        elementalDamageBonus: 0.714,
        attackTypeDamageBonus: 0.2,
      },
      defense: { characterLevel: 80, enemyLevel: 77 },
      critical: { criticalRate: 0.1, criticalDamage: 0.5 },
    });
    expectDamage(calculatedDamage.baseline, 15087);
  });

  test('case 3: buff', () => {
    const { calculatedDamage } = calculateZhongliPlanetBefall({
      talentLevel: 7,
      stats: {
        hp: 24782,
        atk: 2185,
      },
      enemy: {
        resistance: {
          baseResistance: 0.1,
          resistanceBonus: 0,
        },
      },
      damageBonus: {
        elementalDamageBonus: 0.714,
        attackTypeDamageBonus: 0.2,
        anyDamageBonus: 0.15,
      },
      defense: { characterLevel: 80, enemyLevel: 77 },
      critical: { criticalRate: 0.1, criticalDamage: 0.5 },
    });
    expectDamage(calculatedDamage.baseline, 22062);
  });
});
