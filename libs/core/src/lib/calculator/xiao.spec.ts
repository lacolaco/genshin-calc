import { calculateXiaoPlungingAttackDamage, calculateXiaoElementalSkillDamage } from './xiao';

describe('Xiao', () => {
  describe('Skill Damage', () => {
    test('攻撃力に依存する', () => {
      const calculation = calculateXiaoElementalSkillDamage({
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
      const { calculatedDamage } = calculateXiaoElementalSkillDamage({
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

  describe('High Plunging Damage', () => {
    test('攻撃力に依存する', () => {
      const calculation = calculateXiaoPlungingAttackDamage({
        talentLevel: 8,
        burstTalentLevel: 8,
        stats: { atk: 2000 },
      });
      expect(calculation).toBeDefined();
      expect(calculation).toMatchInlineSnapshot(`
        Object {
          "calculatedDamage": Object {
            "average": 6494,
            "baseline": 6494,
            "critical": 6494,
          },
          "skillDamage": 6980,
        }
      `);
    });

    test('Fit to real damage', () => {
      const { calculatedDamage } = calculateXiaoPlungingAttackDamage({
        talentLevel: 5,
        burstTalentLevel: 6,
        stats: { atk: 1579 },
        critical: { criticalRate: 0.568, criticalDamage: 0.748 },
        damageBonus: { elementalDamageBonus: 0.15, anyDamageBonus: 0.1 },
        defense: { characterLevel: 80, enemyLevel: 85 },
        resistance: { baseResistance: 0.1, resistanceBonus: 0 },
      });
      expect(calculatedDamage.critical).toBeWithinErrorMargin(6881);
    });
  });
});
