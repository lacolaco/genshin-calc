import { Calculation, Calculator } from '@genshin-calc/core';
import { patch } from '@rx-angular/state';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

export const useCalculator = <T extends { calculatorParams: Params }, Params = unknown>(
  calculator: Calculator<Params>,
) => {
  return pipe(
    map<T, T & { calculation: Calculation }>((value) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      patch(value as any, { calculation: calculator(value.calculatorParams) }),
    ),
  );
};
