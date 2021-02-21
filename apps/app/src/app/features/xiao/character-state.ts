import { Injectable } from '@angular/core';
import { CriticalParams, DamageBonusParams, DefenseReductionParams, RecursiveNonNullable } from '@genshin-calc/core';
import { RxState } from '@rx-angular/state';

export type CharacterState = {
  stats: {
    atk: number;
  };
  damageBonus: RecursiveNonNullable<DamageBonusParams>;
  defense: DefenseReductionParams;
  critical: CriticalParams;
};

export const initialState: CharacterState = {
  stats: {
    atk: 1800,
  },
  critical: {
    criticalRate: 0.05,
    criticalDamage: 0.5,
  },
  damageBonus: {
    anyDamageBonus: 0,
    elementalDamageBonus: 0.15,
    attackTypeDamageBonus: 0,
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
  set({ defense, critical, stats, damageBonus }: CharacterState) {
    super.set((state) => ({
      ...state,
      stats: {
        ...state.stats,
        atk: stats.atk ?? state.stats.atk,
      },
      damageBonus: {
        ...state.damageBonus,
        elementalDamageBonus: damageBonus.elementalDamageBonus ?? state.damageBonus.elementalDamageBonus,
      },
      defense: {
        ...state.defense,
        characterLevel: defense.characterLevel ?? state.defense.characterLevel,
        enemyLevel: defense.enemyLevel ?? state.defense.enemyLevel,
        defenseBonus: defense.defenseBonus ?? state.defense.defenseBonus,
      },
      critical: {
        ...state.critical,
        criticalDamage: critical.criticalDamage ?? state.critical.criticalDamage,
        criticalRate: critical.criticalRate ?? state.critical.criticalRate,
      },
    }));
  }
}
