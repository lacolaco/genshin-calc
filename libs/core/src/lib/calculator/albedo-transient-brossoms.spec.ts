import { calculateAlbedoTransientBlossoms } from './albedo-transient-brossoms';

export function expectDamage(actual: number, expected: number) {
  const delta = expected * 0.01;
  expect(actual).toBeLessThanOrEqual(expected + delta);
  expect(actual).toBeGreaterThanOrEqual(expected - delta);
}

describe('calculateAlbedoTransientBlossoms', () => {
  test('case 1: minimal', () => {
    const { calculatedDamage } = calculateAlbedoTransientBlossoms({
      talentLevel: 6,

      character: {
        level: 80,
        stats: {
          def: 1583,
          criticalRate: 0.05 + 0.28,
          criticalDamage: 0.957,
        },
        bonus: {
          elementalDamageBonus: 0.733,
          enableGeoResonanceBonus: false,
          attackTypeDamageBonus: 0,
        },
      },
      enemy: {
        level: 77,
        resistance: {
          baseResistance: 0.1,
          resistanceBonus: 0,
        },
      },
    });
    expectDamage(calculatedDamage.baseline, 2341);
    expect(calculatedDamage).toMatchInlineSnapshot(`
      Object {
        "average": 3063,
        "baseline": 2327,
        "critical": 4555,
      }
    `);
  });
});
