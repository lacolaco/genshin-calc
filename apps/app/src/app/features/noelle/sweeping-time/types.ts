import { calculateNoelleSweepingTimeAttack, RecursiveNonNullable } from '@genshin-calc/core';

export type CalculatorParams = RecursiveNonNullable<Parameters<typeof calculateNoelleSweepingTimeAttack>[0]>;
