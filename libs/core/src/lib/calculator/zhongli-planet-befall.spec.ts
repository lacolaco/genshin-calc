import { calculateZhongliPlanetBefall } from './zhongli-planet-befall';

describe('burst damage', () => {
  test('case 1: minimal', () => {
    const { calculatedDamage } = calculateZhongliPlanetBefall({
      talentLevel: 7,
      stats: {
        hp: 14289,
        atk: 259,
      },
      damageBonus: {
        elementalDamageBonus: 0.216,
      },
      resistance: { baseResistance: 0.1, resistanceBonus: 0 },
      defense: { characterLevel: 80, enemyLevel: 77 },
      critical: { criticalRate: 0.05, criticalDamage: 0.5 },
    });

    expect(calculatedDamage.baseline).toBeWithinErrorMargin(3609);
    expect(calculatedDamage.critical).toBeWithinErrorMargin(3609 * 1.5);
    expect(calculatedDamage.average).toBeWithinErrorMargin(3609 * (1 + 0.05 * 0.5));
  });

  test('case 2: no buff', () => {
    const { calculatedDamage } = calculateZhongliPlanetBefall({
      talentLevel: 7,
      stats: {
        hp: 24782,
        atk: 1305,
      },
      damageBonus: {
        elementalDamageBonus: 0.714,
        attackTypeDamageBonus: 0.2,
      },
      resistance: { baseResistance: 0.1, resistanceBonus: 0 },
      defense: { characterLevel: 80, enemyLevel: 77 },
      critical: { criticalRate: 0.1, criticalDamage: 0.5 },
    });
    expect(calculatedDamage.baseline).toBeWithinErrorMargin(15087);
  });

  test('case 3: buff', () => {
    const { calculatedDamage } = calculateZhongliPlanetBefall({
      talentLevel: 7,
      stats: {
        hp: 24782,
        atk: 2185,
      },
      damageBonus: {
        elementalDamageBonus: 0.714,
        attackTypeDamageBonus: 0.2,
        anyDamageBonus: 0.15,
      },
      resistance: { baseResistance: 0.1, resistanceBonus: 0 },
      defense: { characterLevel: 80, enemyLevel: 77 },
      critical: { criticalRate: 0.1, criticalDamage: 0.5 },
    });
    expect(calculatedDamage.baseline).toBeWithinErrorMargin(22062);
  });
});
