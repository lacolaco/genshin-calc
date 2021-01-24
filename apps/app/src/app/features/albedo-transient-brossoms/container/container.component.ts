import { Component } from '@angular/core';
import { calculateAlbedoTransientBlossoms } from '@genshin-calc/core';
import { RxState } from '@rx-angular/state';
import { useCalculator } from '../../../shared/operators/use-calculator';
import { initialState, State } from '../state';
import { CalculatorParams } from '../types';

@Component({
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css'],
})
export class AlbedoTransientBlossomsContainerComponent extends RxState<State> {
  readonly state$ = this.select().pipe(useCalculator(calculateAlbedoTransientBlossoms));

  constructor() {
    super();
    this.set(initialState);
  }

  setCalculateParams(calculationParams: CalculatorParams) {
    this.set({ calculatorParams: calculationParams });
  }
}
