import { Calculation, Calculator } from '@genshin-calc/core';
import { patch } from '@rx-angular/state';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';

export const useCalculator = <T extends { calculatorParams: Params }, Params = unknown>(
  calculator: Calculator<Params>,
) => {
  return pipe<Observable<T>, Observable<T & { calculation: Calculation }>>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    map((value) => patch(value as any, { calculation: calculator(value.calculatorParams) })),
  );
};
