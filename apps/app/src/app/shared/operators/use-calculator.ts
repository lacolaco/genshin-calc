import { Calculator } from '@genshin-calc/core';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

export const useCalculator = <T extends { calculatorParams: Params }, Params = unknown>(
  calculator: Calculator<Params>,
) => {
  return pipe(
    // optional use transformationHelpers https://github.com/rx-angular/rx-angular/blob/master/libs/state/docs/api/overview.md#transformation-helpers
    // map((value: T) => setProp(value, 'calculation', calculator(value.calculatorParams)))
    // map((value: T) => patch(value, {calculation: calculator(value.calculatorParams)}))
    map((value: T) => ({
      ...value,
      calculation: calculator(value.calculatorParams),
    })),
  );
};
