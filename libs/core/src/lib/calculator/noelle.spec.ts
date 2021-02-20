import { calculateNoelleSweepingTimeAttack } from './noelle';

describe('Noelle', () => {
  describe('Sweeping Time', () => {
    test('攻撃力と防御力に依存し、星座6凸のフラグとヒット数のパラメータを持つ', () => {
      const calculation = calculateNoelleSweepingTimeAttack({
        talentLevel: 10,
        stats: {
          atk: 1500,
          def: 2000,
        },
        enableConstellationLv6: true,
        hitCount: 4,
      });

      expect(calculation).toBeDefined();
      expect(calculation).toMatchInlineSnapshot(`
        Object {
          "calculatedDamage": Object {
            "average": 13711,
            "baseline": 13711,
            "critical": 13711,
          },
          "skillDamage": 27422,
        }
      `);
    });
  });
});
