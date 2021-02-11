import { Component } from '@angular/core';
import { calculateGanyuCelestialShower } from '@genshin-calc/core';
import { RxState } from '@rx-angular/state';
import { map } from 'rxjs/operators';
import { useCalculator } from '../../../shared/operators/use-calculator';
import { CharacterStore } from '../character-state';
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
export class CelestialShowerContainerComponent extends RxState<State> {
  readonly state$ = this.select(
    map((state) => ({ calculatorParams: state })),
    useCalculator(calculateGanyuCelestialShower),
  );

  constructor(private readonly characterStore: CharacterStore) {
    super();
    this.set(initialState);
    this.connect(characterStore.select());
  }

  setCalculateParams(calculatorParams: CalculatorParams) {
    this.set(calculatorParams);
    this.characterStore.set(calculatorParams);
  }
}
