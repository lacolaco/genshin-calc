import { Calculator } from '@genshin-calc/core';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

export const useCalculator = <T extends { calculatorParams: Params }, Params = unknown>(
  calculator: Calculator<Params>,
) => {
  return pipe(
    map((value: T) => ({
      ...value,
      calculation: calculator(value.calculatorParams),
    })),
  );
};
