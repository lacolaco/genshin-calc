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
      character: {
        level: 80,
        stats: {
          hp: 14289,
          atk: 259,
          criticalRate: 0.05,
          criticalDamage: 0.5,
        },
        bonus: {
          elementalDamageBonus: 0.216,
          attackTypeDamageBonus: 0,
          enableGeoResonanceBonus: false,
        },
      },
      enemy: {
        level: 77,
        resistance: {
          baseResistance: 0.1,
          resistanceBonus: 0,
        },
      },
      critical: { criticalRate: 0.05, criticalDamage: 0.5 },
    });

    expectDamage(calculatedDamage.baseline, 3609);
    expect(calculatedDamage.critical).toBeCloseTo(3609 * 1.5, -1);
    expect(calculatedDamage.average).toBeCloseTo(3609 * (1 + 0.05 * 0.5), -1);
  });

  test('case 2: no buff', () => {
    const { calculatedDamage } = calculateZhongliPlanetBefall({
      talentLevel: 7,
      character: {
        level: 80,
        stats: {
          hp: 24782,
          atk: 1305,
          criticalRate: 0.1,
          criticalDamage: 0.5,
        },
        bonus: {
          elementalDamageBonus: 0.714,
          attackTypeDamageBonus: 0.2,
          enableGeoResonanceBonus: false,
        },
      },
      enemy: {
        level: 77,
        resistance: {
          baseResistance: 0.1,
          resistanceBonus: 0,
        },
      },
      critical: { criticalRate: 0.1, criticalDamage: 0.5 },
    });
    expectDamage(calculatedDamage.baseline, 15087);
  });

  test('case 3: buff', () => {
    const { calculatedDamage } = calculateZhongliPlanetBefall({
      talentLevel: 7,
      character: {
        level: 80,
        stats: {
          hp: 24782,
          atk: 2185,
          criticalRate: 0.1,
          criticalDamage: 0.5,
        },
        bonus: {
          enableGeoResonanceBonus: true,
          elementalDamageBonus: 0.714,
          attackTypeDamageBonus: 0.2,
        },
      },
      enemy: {
        level: 77,
        resistance: {
          baseResistance: 0.1,
          resistanceBonus: 0,
        },
      },
      critical: { criticalRate: 0.1, criticalDamage: 0.5 },
    });
    expectDamage(calculatedDamage.baseline, 22062);
  });
});
