import { Component } from '@angular/core';
import { calculateZhongliPlanetBefall, characters } from '@genshin-calc/core';
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
export class ZhongliPlanetBefallContainerComponent extends RxState<State> {
  readonly character = characters.zhongli;
  readonly state$ = this.select(useCalculator(calculateZhongliPlanetBefall));

  constructor() {
    super();
    this.set(initialState);
  }

  calculate(calculatorParams: CalculatorParams) {
    this.set({ calculatorParams });
  }
}
