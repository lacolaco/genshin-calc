export const defaultValues = {
  talentLebel: 6,
  character: {
    level: 80,
    stats: {
      hp: 20000,
      atk: 1500,
      def: 1500,
      elementalMastery: 50,
      criticalRate: 0.1,
      criticalDamage: 0.5,
    },
    bonus: {
      enableGeoResonance: false,
      elementalDamageBonus: 0.5,
      chargedAttackDamageBonus: 0.35,
    },
  },
  enemy: {
    level: 80,
    resistance: {
      baseResistance: 0.1,
    },
  },
} as const;
