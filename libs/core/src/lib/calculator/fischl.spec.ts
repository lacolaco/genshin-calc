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
  });
});
