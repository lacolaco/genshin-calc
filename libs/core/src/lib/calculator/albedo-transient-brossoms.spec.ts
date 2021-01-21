import { AlbedoTransientBlossomsCalculator } from './albedo-transient-brossoms';

export function expectDamage(actual: number, expected: number) {
  const delta = expected * 0.01;
  expect(actual).toBeLessThanOrEqual(expected + delta);
  expect(actual).toBeGreaterThanOrEqual(expected - delta);
}

describe('AlbedoTransientBlossomsCalculator', () => {
  test('case 1: minimal', () => {
    const calculator = new AlbedoTransientBlossomsCalculator();

    const { result } = calculator.calc({
      skillDamage: {
        talentLevel: 6,
        stats: {
          def: 1583,
        },
      },
      damageBonus: {
        elementalDamageBonus: 0.733,
        enableGeoResonance: false,
        skillDamageBonus: 0,
      },
      damageReduction: {
        characterLevel: 80,
        enemyLevel: 77,
        baseResistance: 0.1,
        resistanceBonus: 0,
        resistanceDebuff: 0,
      },
      critical: {
        criticalRate: 0.05 + 0.28,
        criticalDamage: 0.957,
      },
    });
    expectDamage(result.baseline, 2341);
    expect(result).toMatchInlineSnapshot(`
      Object {
        "average": 3063,
        "baseline": 2327,
        "critical": 4555,
      }
    `);
  });
});
