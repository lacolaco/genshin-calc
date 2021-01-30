import { calculateXinyanRiffRevolution } from './xinyan';

describe('Xinyan', () => {
  describe('RiffRevolution', () => {
    test('攻撃力依存のダメージを計算する', () => {
      const calculation = calculateXinyanRiffRevolution({
        talentLevel: 10,
        stats: {
          atk: 2000,
        },
        damageBonus: {},
        defense: {
          characterLevel: 80,
          enemyLevel: 80,
        },
        resistance: { baseResistance: 0.1 },
        critical: { criticalRate: 1, criticalDamage: 0.5 },
      });
      expect(calculation).toBeDefined();
      expect(calculation).toMatchInlineSnapshot(`
        Object {
          "calculatedDamage": Object {
            "average": 8275,
            "baseline": 5517,
            "critical": 8275,
          },
          "skillDamage": 12260,
        }
      `);
    });
    test('Fit to real damage', () => {
      const { calculatedDamage } = calculateXinyanRiffRevolution({
        talentLevel: 7,
        stats: { atk: 1154 },
        critical: { criticalRate: 1, criticalDamage: 0.683 },
        damageBonus: { elementalDamageBonus: 0.479, attackTypeDamageBonus: 0.2 },
        defense: { characterLevel: 60, enemyLevel: 76 },
        resistance: { baseResistance: 0.7, resistanceBonus: -0.15 },
      });
      expect(calculatedDamage.critical).toBeWithinErrorMargin(3572);
    });
  });
});
