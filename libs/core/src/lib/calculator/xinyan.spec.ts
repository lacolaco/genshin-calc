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
  });
});
