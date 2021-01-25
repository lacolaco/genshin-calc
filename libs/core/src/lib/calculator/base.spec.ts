import { createCalculator } from './base';

describe('createCalculator は Calculator を返す', () => {
  test('Calculator は functionである', () => {
    const calculator = createCalculator({
      getBaseDamage: () => 0,
      getDamageBonus: () => 0,
    });

    expect(typeof calculator).toBe('function');
  });

  describe('Calculatorはスキルダメージを計算できる', () => {
    test('渡した関数にしたがってスキルダメージを計算できる', () => {
      const calculator = createCalculator({
        getBaseDamage: ({ skillDamage }: { skillDamage: number }) => skillDamage,
        getDamageBonus: () => 0,
      });
      const calculation = calculator({
        skillDamage: 100,
        character: {
          level: 0,
        },
        enemy: {
          level: 0,
          resistance: { baseResistance: 0, resistanceBonus: 0 },
        },
      });

      expect(calculation.skillDamage).toBe(100);
    });
  });
  describe('Calculatorはダメージバフを計算できる', () => {
    test('渡した関数にしたがってダメージバフを計算する', () => {
      const calculator = createCalculator({
        getBaseDamage: () => 0,
        getDamageBonus: ({ damageBonus }: { damageBonus: number }) => damageBonus,
      });
      const calculation = calculator({
        damageBonus: 0.5,
        character: {
          level: 0,
        },
        enemy: {
          level: 0,
          resistance: { baseResistance: 0, resistanceBonus: 0 },
        },
      });

      expect(calculation.damageBonus).toBe(0.5);
    });
  });
  describe('Calculatorは与ダメージを計算できる', () => {
    test.todo('');
    test('渡した関数にしたがってダメージを計算する', () => {
      const calculator = createCalculator({
        getBaseDamage: () => 0,
        getDamageBonus: ({ damageBonus }: { damageBonus: number }) => damageBonus,
      });
      const calculation = calculator({
        damageBonus: 0.5,
        character: {
          level: 0,
        },
        enemy: {
          level: 0,
          resistance: { baseResistance: 0, resistanceBonus: 0 },
        },
      });

      expect(calculation.damageBonus).toBe(0.5);
    });
  });
});
