import { Injectable } from '@angular/core';
import { CriticalParams, DefenseReductionParams } from '@genshin-calc/core';
import { RxState } from '@rx-angular/state';

export type CharacterState = {
  stats: {
    atk: number;
    def: number;
  };
  defense: DefenseReductionParams;
  critical: CriticalParams;
};

export const initialState: CharacterState = {
  stats: {
    atk: 1800,
    def: 1800,
  },
  critical: {
    criticalRate: 0.05,
    criticalDamage: 0.5,
  },
  defense: {
    characterLevel: 80,
    enemyLevel: 80,
    defenseBonus: 0,
  },
};

@Injectable()
export class CharacterStore extends RxState<CharacterState> {
  constructor() {
    super();
    this.set(initialState);
  }

  /**
   * @override
   */
  set({ defense, critical, stats }: CharacterState) {
    super.set({ defense, critical, stats });
  }
}
