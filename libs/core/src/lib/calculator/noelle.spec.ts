import { calculateNoelleSweepingTime } from './noelle';

describe('Noelle', () => {
  describe('Sweeping Time', () => {
    test('攻撃力と防御力に依存し、星座6凸のフラグとヒット数のパラメータを持つ', () => {
      const calculation = calculateNoelleSweepingTime({
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
            "average": 27422,
            "baseline": 27422,
            "critical": 27422,
          },
          "skillDamage": 27422,
        }
      `);
    });
  });
});
