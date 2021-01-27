import { createCalculator } from './factory';

describe('createCalculator は Calculator を返す', () => {
  test('Calculator は functionである', () => {
    const calculator = createCalculator({
      getBaseDamage: () => 0,
    });

    expect(typeof calculator).toBe('function');
  });

  describe('Calculatorはスキルダメージを計算できる', () => {
    test('渡した関数にしたがってスキルダメージを計算できる', () => {
      const calculator = createCalculator({
        getBaseDamage: ({ skillDamage }: { skillDamage: number }) => skillDamage,
      });
      const calculation = calculator({
        skillDamage: 100,
        damageBonus: {},
        defense: { characterLevel: 0, enemyLevel: 0 },
        enemy: {
          resistance: { baseResistance: 0, resistanceBonus: 0 },
        },
      });

      expect(calculation.skillDamage).toBe(100);
    });
  });

  describe('Calculatorは与ダメージを計算できる', () => {
    test('渡した関数にしたがってダメージを計算する', () => {
      const calculator = createCalculator({
        getBaseDamage: () => 100,
      });
      const calculation = calculator({
        damageBonus: { anyDamageBonus: 0.5 },
        defense: { characterLevel: 0, enemyLevel: 0 },
        enemy: {
          resistance: { baseResistance: 0, resistanceBonus: 0 },
        },
      });

      expect(calculation.calculatedDamage.baseline).toBe(75);
    });
  });
});
