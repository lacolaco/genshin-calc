import { calculateRazorSteelFang } from './razor';

describe('レザー', () => {
  describe('通常攻撃ダメージ', () => {
    test('攻撃力に依存し、1~4回のヒット数で合計できる', () => {
      const calculation = calculateRazorSteelFang({
        talentLevel: 10,
        stats: {
          atk: 1500,
        },
        hitCount: 4,
      });

      expect(calculation).toBeDefined();
      expect(calculation).toMatchInlineSnapshot(`
        Object {
          "calculatedDamage": Object {
            "average": 5587,
            "baseline": 5587,
            "critical": 5587,
          },
          "skillDamage": 11175,
        }
      `);
    });
  });
});
