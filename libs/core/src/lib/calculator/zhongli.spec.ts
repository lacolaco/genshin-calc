import { ZhongliBurstCalculator } from './zhongli';

export function expectDamage(actual: number, expected: number) {
  const diff = Math.abs(expected - actual);
  expect(diff / expected).toBeLessThanOrEqual(0.01);
}

describe('burst damage', () => {
  test('case 1: minimal', () => {
    const calculator = new ZhongliBurstCalculator();

    const { result } = calculator.calc({
      skillDamage: {
        talentLevel: 7,
        stats: {
          hp: 14289,
          atk: 259,
        },
      },
      damageBonus: {
        elementalDamageBonus: 0.216,
        burstDamageBonus: 0,
        enableGeoResonance: false,
      },
      damageReduction: {
        characterLevel: 80,
        enemyLevel: 77,
        baseResistance: 0.1,
        resistanceBonus: 0,
        resistanceDebuff: 0,
      },
      critical: {
        criticalRate: 0.05,
        criticalDamage: 0.5,
      },
    });

    expectDamage(result.baseline, 3609);
    expect(result.critical).toBeCloseTo(3609 * 1.5, -1);
    expect(result.average).toBeCloseTo(3609 * (1 + 0.05 * 0.5), -1);
  });

  test('case 2: no buff', () => {
    const calculator = new ZhongliBurstCalculator();

    const { result } = calculator.calc({
      skillDamage: {
        talentLevel: 7,
        stats: {
          hp: 24782,
          atk: 1305,
        },
      },
      damageBonus: {
        elementalDamageBonus: 0.714,
        burstDamageBonus: 0.2,
        enableGeoResonance: false,
      },
      damageReduction: {
        characterLevel: 80,
        enemyLevel: 77,
        baseResistance: 0.1,
        resistanceBonus: 0,
        resistanceDebuff: 0,
      },
      critical: {
        criticalRate: 0.1,
        criticalDamage: 0.5,
      },
    });
    expectDamage(result.baseline, 15087);
  });

  test('case 3: buff', () => {
    const calculator = new ZhongliBurstCalculator();

    const { result } = calculator.calc({
      skillDamage: {
        talentLevel: 7,
        stats: {
          hp: 24782,
          atk: 2185,
        },
      },
      damageBonus: {
        enableGeoResonance: true,
        elementalDamageBonus: 0.714,
        burstDamageBonus: 0.2,
      },
      damageReduction: {
        characterLevel: 80,
        enemyLevel: 77,
        baseResistance: 0.1,
        resistanceBonus: 0,
        resistanceDebuff: 0,
      },
      critical: {
        criticalRate: 0.1,
        criticalDamage: 0.5,
      },
    });
    expectDamage(result.baseline, 22062);
  });
});
