import { calculateXiaoSkillDamage } from './xiao';

describe('Xiao', () => {
  describe('Skill Damage', () => {
    test('攻撃力に依存する', () => {
      const calculation = calculateXiaoSkillDamage({
        talentLevel: 10,
        stats: { atk: 2000 },
      });
      expect(calculation).toBeDefined();
      expect(calculation).toMatchInlineSnapshot(`
        Object {
          "calculatedDamage": Object {
            "average": 4550,
            "baseline": 4550,
            "critical": 4550,
          },
          "skillDamage": 9100,
        }
      `);
    });

    test('Fit to real damage', () => {
      const { calculatedDamage } = calculateXiaoSkillDamage({
        talentLevel: 3,
        stats: { atk: 1579 },
        critical: { criticalRate: 0.568, criticalDamage: 0.748 },
        damageBonus: { elementalDamageBonus: 0.15 },
        defense: { characterLevel: 80, enemyLevel: 85 },
        resistance: { baseResistance: 0.1, resistanceBonus: 0 },
      });
      expect(calculatedDamage.critical).toBeWithinErrorMargin(4096);
    });
  });
});
