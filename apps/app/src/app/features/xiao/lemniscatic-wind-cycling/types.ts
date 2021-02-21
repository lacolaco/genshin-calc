import { calculateXiaoElementalSkillDamage, RecursiveNonNullable } from '@genshin-calc/core';

export type CalculatorParams = RecursiveNonNullable<Parameters<typeof calculateXiaoElementalSkillDamage>[0]>;
