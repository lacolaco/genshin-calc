import { Calculation } from '@genshin-calc/core';

export type CalculatorContainerState<FormValues> = {
  calculation: Calculation | null;
  inputValues: FormValues;
};
