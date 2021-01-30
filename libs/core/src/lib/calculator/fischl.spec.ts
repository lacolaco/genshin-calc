import { calculateFischlNightriderOz } from './fischl';

describe('Fischl', () => {
  describe('Nightrider Oz Damage', () => {
    test('攻撃力に依存する', () => {
      const calculation = calculateFischlNightriderOz({
        talentLevel: 10,
        stats: { atk: 2000 },
      });
      expect(calculation).toBeDefined();
      expect(calculation).toMatchInlineSnapshot(`
        Object {
          "calculatedDamage": Object {
            "average": 1600,
            "baseline": 1600,
            "critical": 1600,
          },
          "skillDamage": 3200,
        }
      `);
    });

    test('Fit to real damage', () => {
      const { calculatedDamage } = calculateFischlNightriderOz({
        talentLevel: 9,
        stats: { atk: 1564 },
        critical: { criticalRate: 0.081, criticalDamage: 0.55 },
        damageBonus: { elementalDamageBonus: 0.15 },
        defense: { characterLevel: 70, enemyLevel: 76 },
        resistance: { baseResistance: 0.1, resistanceBonus: 0 },
      });
      expect(calculatedDamage.baseline).toBeWithinErrorMargin(1200);
    });
  });
});
