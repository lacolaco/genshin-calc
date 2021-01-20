export function calculateDefenseMutiplier(characterLevel: number, enemyLevel: number, resistance: number) {
  const enemyDef = 5 * enemyLevel + 500;
  const defenseReduction = enemyDef / (enemyDef + 5 * characterLevel + 500);
  return (1 - defenseReduction) * (1 - resistance);
}
