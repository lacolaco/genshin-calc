import { calculateOutgoingDamage } from './damage';
import { ElementalReactions } from './types';

describe('発信ダメージが計算される', () => {
  describe('基本発信ダメージは 基礎ダメージ * (1 + ダメージバフ%) で計算される', () => {
    test('基礎ダメージ 100 / ダメージバフ 0% のとき、基本発信ダメージは 100 になる', () => {
      const outgoingDamage = calculateOutgoingDamage(100, 0);
      expect(outgoingDamage.baseline).toBeCloseTo(100);
    });
    test('基礎ダメージ 100 / ダメージバフ 100% のとき、基本発信ダメージは 200 になる', () => {
      const outgoingDamage = calculateOutgoingDamage(100, 1);
      expect(outgoingDamage.baseline).toBeCloseTo(200);
    });
  });

  describe('会心時の発信ダメージは 基本発信ダメージ * (1 + 会心ダメージ%) で計算される', () => {
    test('基本発信ダメージ 100 / 会心ダメージ 0% のとき、会心時の発信ダメージは 100 になる', () => {
      const outgoingDamage = calculateOutgoingDamage(100, 0, { criticalRate: 0, criticalDamage: 0 });
      expect(outgoingDamage.critical).toBeCloseTo(100);
    });
    test('基本発信ダメージ 100 / 会心ダメージ 100% のとき、会心時の発信ダメージは 200 になる', () => {
      const outgoingDamage = calculateOutgoingDamage(100, 0, { criticalDamage: 1, criticalRate: 0 });
      expect(outgoingDamage.critical).toBeCloseTo(200);
    });
  });

  describe('平均発信ダメージは 基本発信ダメージ * (1 + 会心ダメージ * 会心率) で計算される', () => {
    test('基本発信ダメージ 100 / 会心ダメージ 0% / 会心率 0% のとき、平均発信ダメージは 100 になる', () => {
      const outgoingDamage = calculateOutgoingDamage(100, 0, { criticalRate: 0, criticalDamage: 0 });
      expect(outgoingDamage.average).toBeCloseTo(100);
    });
    test('基本発信ダメージ 100 / 会心ダメージ 100% / 会心率 50% のとき、会心時の発信ダメージは 150 になる', () => {
      const outgoingDamage = calculateOutgoingDamage(100, 0, { criticalRate: 0.5, criticalDamage: 1 });
      expect(outgoingDamage.average).toBeCloseTo(150);
    });
  });

  describe('増幅反応時の発信ダメージは 基本発信ダメージ * 反応倍率 * (1 + 元素熟知補正% + 元素反応バフ%) で計算される', () => {
    describe('氷元素による溶解反応の反応倍率は 1.5倍 で計算される', () => {
      test('基本発信ダメージ 100 / 元素熟知 0 / 元素反応バフ% 0 のとき、増幅反応時の発信ダメージは 150 になる', () => {
        const outgoingDamage = calculateOutgoingDamage(
          100,
          0,
          { criticalRate: 0, criticalDamage: 0 },
          { reaction: ElementalReactions.MeltByCryo, elementalMastery: 0, reactionBonus: 0 },
        );
        expect(outgoingDamage.critical).toBeCloseTo(150);
      });
      test('基本発信ダメージ 100 / 元素熟知 0 / 元素反応バフ% 100% のとき、増幅反応時の発信ダメージは 300 になる', () => {
        const outgoingDamage = calculateOutgoingDamage(
          100,
          0,
          { criticalRate: 0, criticalDamage: 0 },
          { reaction: ElementalReactions.MeltByCryo, elementalMastery: 0, reactionBonus: 1 },
        );
        expect(outgoingDamage.critical).toBeCloseTo(300);
      });
      describe('元素熟知補正%は 25/9 × 元素熟知/(1401+元素熟知) で計算される', () => {
        test('基本発信ダメージ 100 / 元素熟知 9 のとき、元素熟知熟知補正が1.773%となり増幅反応時の発信ダメージは 152.66 になる', () => {
          const outgoingDamage = calculateOutgoingDamage(
            100,
            0,
            { criticalRate: 0, criticalDamage: 0 },
            { reaction: ElementalReactions.MeltByCryo, elementalMastery: 9, reactionBonus: 0 },
          );
          expect(outgoingDamage.critical).toBeCloseTo(152.66);
        });
      });
      describe('増幅反応と会心は同時に発生しうる', () => {
        test('基本発信ダメージ 100 / 元素熟知 0 / 会心ダメージ% 100% のとき、増幅反応時の発信ダメージは 300 になる', () => {
          const outgoingDamage = calculateOutgoingDamage(
            100,
            0,
            { criticalRate: 0, criticalDamage: 1 },
            { reaction: ElementalReactions.MeltByCryo, elementalMastery: 0, reactionBonus: 0 },
          );
          expect(outgoingDamage.critical).toBeCloseTo(300);
        });
      });
    });
  });
});
