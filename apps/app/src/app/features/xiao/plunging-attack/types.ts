import { calculateXiaoPlungingAttackDamage, RecursiveNonNullable } from '@genshin-calc/core';

export type CalculatorParams = RecursiveNonNullable<Parameters<typeof calculateXiaoPlungingAttackDamage>[0]>;
