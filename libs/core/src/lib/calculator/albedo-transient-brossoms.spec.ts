import { calculateAlbedoTransientBlossoms } from './albedo-transient-brossoms';

describe('calculateAlbedoTransientBlossoms', () => {
  test('case 1: minimal', () => {
    const { calculatedDamage } = calculateAlbedoTransientBlossoms({
      talentLevel: 6,
      stats: {
        def: 1583,
      },
      damageBonus: {
        elementalDamageBonus: 0.733,
      },
      resistance: { baseResistance: 0.1, resistanceBonus: 0 },
      defense: { characterLevel: 80, enemyLevel: 77 },
      critical: {
        criticalRate: 0.05 + 0.28,
        criticalDamage: 0.957,
      },
    });
    expect(calculatedDamage).toMatchInlineSnapshot(`
      Object {
        "average": 3063,
        "baseline": 2327,
        "critical": 4555,
      }
    `);
  });
  test('Fit to real damage', () => {
    const { calculatedDamage } = calculateAlbedoTransientBlossoms({
      talentLevel: 6,
      stats: {
        def: 1609,
      },
      damageBonus: {
        elementalDamageBonus: 0.832,
      },
      resistance: { baseResistance: 0.1, resistanceBonus: 0 },
      defense: { characterLevel: 80, enemyLevel: 76 },
      critical: {
        criticalRate: 0.377,
        criticalDamage: 0.948,
      },
    });
    expect(calculatedDamage.critical).toBeWithinErrorMargin(4888);
  });
});
