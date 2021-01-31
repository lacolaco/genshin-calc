import { calculateBasicAttack } from './basic';

describe('汎用ダメージ', () => {
  it('任意のスキルダメージ%と攻撃力に依存する', () => {
    const calc = calculateBasicAttack({
      skillDamage: 100,
      stats: {
        atk: 2000,
      },
    });
    expect(calc).toBeDefined();
    expect(calc).toMatchInlineSnapshot(`
      Object {
        "calculatedDamage": Object {
          "average": 100000,
          "baseline": 100000,
          "critical": 100000,
        },
        "skillDamage": 200000,
      }
    `);
  });
});
