import { Component } from '@angular/core';
import { calculateXinyanRiffRevolution, characters } from '@genshin-calc/core';
import { RxState } from '@rx-angular/state';
import { useCalculator } from '../../../shared/operators/use-calculator';
import { initialState, State } from '../state';
import { CalculatorParams } from '../types';

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
export class ContainerComponent extends RxState<State> {
  readonly character = characters.xinyan;
  readonly state$ = this.select(useCalculator(calculateXinyanRiffRevolution));

  constructor() {
    super();
    this.set(initialState);
  }

  calculate(calculatorParams: CalculatorParams) {
    this.set({ calculatorParams });
  }
}
