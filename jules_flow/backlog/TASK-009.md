---
id: TASK-009
title: "Enemy AI: Attack Player when Adjacent"
epic: "Phase 1 (MVP): Browser-Based Combat Core"
status: done
priority: medium
dependencies: []
assignee: Jules
---

### Descrição

Implement simple AI logic for enemy units to attack the player unit if they are adjacent.

### Critérios de Aceitação

- [ ] During an enemy unit's turn, if adjacent to the player unit, it attacks the player.
- [ ] The attack triggers damage calculation against the player unit.
- [ ] The attack consumes the enemy unit's action for the turn.

### Arquivos Relevantes

* `js/main.js`

### Relatório de Execução

Implemented enemy AI attack functionality in `js/main.js`.
- Modified the `executeEnemyTurn(enemyUnit)` function.
- Within this function, if `isAdjacent(enemyUnit, playerUnit)` evaluates to true:
    - An attack sequence is initiated.
    - A message is logged to the console indicating that the enemy unit is attacking the player unit.
    - The `playerUnit.hp` is decremented by 1 (as per MVP fixed damage).
    - The player's new HP is logged to the console.
    - The enemy's turn then ends via the existing `setTimeout(nextTurn, 500)` call.
- If the enemy is not adjacent to the player, the previously implemented movement logic (TASK-008) is executed.

This fulfills all acceptance criteria:
- During an enemy unit's turn, if adjacent to the player unit, it attacks the player (verified by console logs and HP reduction).
- The attack triggers damage calculation against the player unit (player HP reduced by 1).
- The attack consumes the enemy unit's action for the turn (turn ends after the attack).
