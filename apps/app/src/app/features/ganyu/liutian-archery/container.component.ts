import { Component } from '@angular/core';
import { calculateGanyuLiutianArchery } from '@genshin-calc/core';
import { RxState } from '@rx-angular/state';
import { useCalculator } from '../../../shared/operators/use-calculator';
import { initialState, State } from './state';
import { CalculatorParams } from './types';

@Component({
  templateUrl: './container.component.html',
  styles: [
    `
      :host {
        display: block;
        height: 100%;
      }
    `,
  ],
})
export class LiutianArcheryContainerComponent extends RxState<State> {
  readonly state$ = this.select(useCalculator(calculateGanyuLiutianArchery));

  constructor() {
    super();
    this.set(initialState);
  }

  setCalculateParams(calculatorParams: CalculatorParams) {
    this.set({ calculatorParams });
  }
}
