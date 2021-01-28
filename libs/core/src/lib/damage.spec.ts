import { calculateOutgoingDamage, calculateIncomingDamage } from './damage';
import { ElementalReactions } from './types';

describe('発信ダメージが計算される', () => {
  describe('基本発信ダメージは 基礎ダメージ * (1 + ダメージバフ%) で計算される', () => {
    test('基礎ダメージ 100 / ダメージバフ 0% のとき、基本発信ダメージは 100 になる', () => {
      const outgoingDamage = calculateOutgoingDamage(100, {});
      expect(outgoingDamage.baseline).toBeCloseTo(100);
    });
    describe('ダメージバフ%は合算される', () => {
      test('元素ダメージバフ 100% のとき、ダメージバフは 100% になる', () => {
        const outgoingDamage = calculateOutgoingDamage(100, { elementalDamageBonus: 1 });
        expect(outgoingDamage.baseline).toBeCloseTo(200);
      });
      test('元素ダメージバフ 20% / 攻撃タイプダメージバフ 20% / 与えるダメージバフ 20% のとき、ダメージバフは 60% になる', () => {
        const outgoingDamage = calculateOutgoingDamage(100, {
          elementalDamageBonus: 0.2,
          attackTypeDamageBonus: 0.2,
          anyDamageBonus: 0.2,
        });
        expect(outgoingDamage.baseline).toBeCloseTo(160);
      });
    });
  });

  describe('会心時の発信ダメージは 基本発信ダメージ * (1 + 会心ダメージ%) で計算される', () => {
    test('基本発信ダメージ 100 / 会心ダメージ 0% のとき、会心時の発信ダメージは 100 になる', () => {
      const outgoingDamage = calculateOutgoingDamage(100, {}, { criticalRate: 0, criticalDamage: 0 });
      expect(outgoingDamage.critical).toBeCloseTo(100);
    });
    test('基本発信ダメージ 100 / 会心ダメージ 100% のとき、会心時の発信ダメージは 200 になる', () => {
      const outgoingDamage = calculateOutgoingDamage(100, {}, { criticalDamage: 1, criticalRate: 0 });
      expect(outgoingDamage.critical).toBeCloseTo(200);
    });
  });

  describe('平均発信ダメージは 基本発信ダメージ * (1 + 会心ダメージ * 会心率) で計算される', () => {
    test('基本発信ダメージ 100 / 会心ダメージ 0% / 会心率 0% のとき、平均発信ダメージは 100 になる', () => {
      const outgoingDamage = calculateOutgoingDamage(100, {}, { criticalRate: 0, criticalDamage: 0 });
      expect(outgoingDamage.average).toBeCloseTo(100);
    });
    test('基本発信ダメージ 100 / 会心ダメージ 100% / 会心率 50% のとき、会心時の発信ダメージは 150 になる', () => {
      const outgoingDamage = calculateOutgoingDamage(100, {}, { criticalRate: 0.5, criticalDamage: 1 });
      expect(outgoingDamage.average).toBeCloseTo(150);
    });
  });

  describe('増幅反応時の発信ダメージは 基本発信ダメージ * 反応倍率 * (1 + 元素熟知補正% + 元素反応バフ%) で計算される', () => {
    describe('氷元素による溶解反応の反応倍率は 1.5倍 で計算される', () => {
      test('基本発信ダメージ 100 / 元素熟知 0 / 元素反応バフ% 0 のとき、増幅反応時の発信ダメージは 150 になる', () => {
        const outgoingDamage = calculateOutgoingDamage(
          100,
          {},
          { criticalRate: 0, criticalDamage: 0 },
          { reaction: ElementalReactions.MeltByCryo, elementalMastery: 0, reactionBonus: 0 },
        );
        expect(outgoingDamage.critical).toBeCloseTo(150);
      });
      test('基本発信ダメージ 100 / 元素熟知 0 / 元素反応バフ% 100% のとき、増幅反応時の発信ダメージは 300 になる', () => {
        const outgoingDamage = calculateOutgoingDamage(
          100,
          {},
          { criticalRate: 0, criticalDamage: 0 },
          { reaction: ElementalReactions.MeltByCryo, elementalMastery: 0, reactionBonus: 1 },
        );
        expect(outgoingDamage.critical).toBeCloseTo(300);
      });
      describe('元素熟知補正%は 25/9 × 元素熟知/(1400+元素熟知) で計算される', () => {
        test('基本発信ダメージ 100 / 元素熟知 10 のとき、元素熟知熟知補正が1.970%となり増幅反応時の発信ダメージは 152.96 になる', () => {
          const outgoingDamage = calculateOutgoingDamage(
            100,
            {},
            { criticalRate: 0, criticalDamage: 0 },
            { reaction: ElementalReactions.MeltByCryo, elementalMastery: 10 },
          );
          expect(outgoingDamage.critical).toBeCloseTo(152.96);
        });
      });
      describe('増幅反応と会心は同時に発生しうる', () => {
        test('基本発信ダメージ 100 / 元素熟知 0 / 会心ダメージ% 100% のとき、増幅反応時の発信ダメージは 300 になる', () => {
          const outgoingDamage = calculateOutgoingDamage(
            100,
            {},
            { criticalRate: 0, criticalDamage: 1 },
            { reaction: ElementalReactions.MeltByCryo, elementalMastery: 0 },
          );
          expect(outgoingDamage.critical).toBeCloseTo(300);
        });
      });
    });
  });
});

describe('受信ダメージが計算される', () => {
  describe('受信ダメージは 発信ダメージ * (1 - 防御ダメージ減衰%) × (1 - 耐性ダメージ減衰%) で計算される', () => {
    describe('防御ダメージ減衰%は 1 / (1 + (キャラレベル + 100) / (1 + 防御バフ%) * (敵レベル + 100)) で計算される', () => {
      test('発信ダメージ 100 / キャラレベル 100 / 敵レベル 100 / 防御バフ 0% のとき、のとき、 防御ダメージ減衰は 50% となり受信ダメージは 50 になる', () => {
        const incomingDamage = calculateIncomingDamage(
          { baseline: 100, critical: 100, average: 100 },
          { characterLevel: 100, enemyLevel: 100, defenseBonus: 0 },
          { baseResistance: 0 },
        );
        expect(incomingDamage.baseline).toBeCloseTo(50);
      });
      test('発信ダメージ 100 / キャラレベル 100 / 敵レベル 100 / 防御バフ -100% のとき、 防御ダメージ減衰は 0% となり受信ダメージは 100 になる', () => {
        const incomingDamage = calculateIncomingDamage(
          { baseline: 100, critical: 100, average: 100 },
          { characterLevel: 100, enemyLevel: 100, defenseBonus: -1 },
          { baseResistance: 0 },
        );
        expect(incomingDamage.baseline).toBeCloseTo(100);
      });
    });

    describe('耐性ダメージ減衰%は敵の 耐性% をもとに計算される', () => {
      describe('耐性%は 敵の基礎耐性% + 耐性バフ% で計算される', () => {
        test('発信ダメージ 100 / 防御ダメージ減衰 0% / 基礎耐性 10% / 耐性ボーナス 10% のとき、耐性ダメージ減衰は 20% となり受信ダメージは 80 になる', () => {
          const incomingDamage = calculateIncomingDamage(
            { baseline: 100, critical: 100, average: 100 },
            { characterLevel: 100, enemyLevel: 100, defenseBonus: -1 },
            { baseResistance: 0.1, resistanceBonus: 0.1 },
          );
          expect(incomingDamage.baseline).toBeCloseTo(80);
        });
      });
      describe('耐性% < 0 のとき、耐性ダメージ減衰%は 元素ダメージ耐性% / 2 で計算される', () => {
        test('発信ダメージ 100 / 防御ダメージ減衰 0% / 耐性 -50% のとき、耐性ダメージ減衰は -25% となり受信ダメージは 125 になる', () => {
          const incomingDamage = calculateIncomingDamage(
            { baseline: 100, critical: 100, average: 100 },
            { characterLevel: 100, enemyLevel: 100, defenseBonus: -1 },
            { baseResistance: -0.5 },
          );
          expect(incomingDamage.baseline).toBeCloseTo(125);
        });
      });
      describe('0 <= 耐性% < 75% のとき、耐性ダメージ減衰%は 元素ダメージ耐性% で計算される', () => {
        test('発信ダメージ 100 / 防御ダメージ減衰 0% / 耐性 50% のとき、耐性ダメージ減衰は 50% となり受信ダメージは 50 になる', () => {
          const incomingDamage = calculateIncomingDamage(
            { baseline: 100, critical: 100, average: 100 },
            { characterLevel: 100, enemyLevel: 100, defenseBonus: -1 },
            { baseResistance: 0.5 },
          );
          expect(incomingDamage.baseline).toBeCloseTo(50);
        });
      });
      describe('耐性% >= 75% のとき、耐性ダメージ減衰%は 1 / (1 + (1 / 4 * 元素ダメージ耐性%)) で計算される', () => {
        test('発信ダメージ 100 / 防御ダメージ減衰 0% / 耐性 75% のとき、耐性ダメージ減衰は 75% となり受信ダメージは 25 になる', () => {
          const incomingDamage = calculateIncomingDamage(
            { baseline: 100, critical: 100, average: 100 },
            { characterLevel: 100, enemyLevel: 100, defenseBonus: -1 },
            { baseResistance: 0.75 },
          );
          expect(incomingDamage.baseline).toBeCloseTo(25);
        });
        test('発信ダメージ 100 / 防御ダメージ減衰 0% / 元素ダメージ耐性 100% のとき、耐性ダメージ減衰は 80% となり受信ダメージは 20 になる', () => {
          const incomingDamage = calculateIncomingDamage(
            { baseline: 100, critical: 100, average: 100 },
            { characterLevel: 100, enemyLevel: 100, defenseBonus: -1 },
            { baseResistance: 1 },
          );
          expect(incomingDamage.baseline).toBeCloseTo(20);
        });
      });
    });
  });
});
