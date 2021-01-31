import { Component } from '@angular/core';
import { calculateBasicAttack } from '@genshin-calc/core';
import { RxState } from '@rx-angular/state';
import { useCalculator } from '../../../shared/operators/use-calculator';
import { initialState, State } from '../state';
import { CalculatorParams } from '../types';

@Component({
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css'],
})
export class ContainerComponent extends RxState<State> {
  readonly state$ = this.select(useCalculator(calculateBasicAttack));

  constructor() {
    super();
    this.set(initialState);
  }

  calculate(calculatorParams: CalculatorParams) {
    this.set({ calculatorParams });
  }
}
