import { calculateGanyuCelestialShower, RecursiveNonNullable } from '@genshin-calc/core';

export type CalculatorParams = RecursiveNonNullable<Parameters<typeof calculateGanyuCelestialShower>[0]>;
