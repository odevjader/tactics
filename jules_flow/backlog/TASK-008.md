---
id: TASK-008
title: "Enemy AI: Movement towards Player"
epic: "Phase 1 (MVP): Browser-Based Combat Core"
status: done
priority: medium
dependencies: []
assignee: Jules
---

### Descrição

Implement simple AI logic for enemy units to move towards the player unit if they are not already adjacent.

### Critérios de Aceitação

- [ ] During an enemy unit's turn, if not adjacent to the player, it moves one tile closer to the player unit.
- [ ] Enemy movement follows the same rules as player movement (e.g., valid tiles, grid boundaries).
- [ ] A simple pathfinding (e.g., move horizontally then vertically, or vice-versa, to reduce distance) is used.
- [ ] If multiple player units exist (post-MVP), a target selection rule is needed (MVP: target the single player unit).

### Arquivos Relevantes

* `js/main.js`

### Relatório de Execução

Implemented basic enemy AI movement in `js/main.js`.
- Created `findPlayerUnit()` to locate the player unit (MVP assumes one).
- Created `executeEnemyTurn(enemyUnit)` function:
    - If the enemy is already adjacent to the player, it currently does nothing and ends its turn (attack logic is for TASK-009).
    - If not adjacent, it calculates the direction to the player (dx, dy).
    - It attempts to move one step in the x-direction first, then y-direction, if the target cell is valid (using `isValidMoveTarget`).
    - The move, or inability to move, is logged to the console.
    - The function schedules `nextTurn()` via `setTimeout` (500ms delay) to pass the turn.
- Modified `nextTurn()` function:
    - It now clears `selectedUnit`.
    - Calls `gameLoop()` to refresh UI for the new turn.
    - If the `currentTurnUnit` is an enemy, it calls `executeEnemyTurn` for that unit after a short delay (250ms) to simulate AI "thinking".
    - Player turns still rely on `handleCanvasClick` for actions.
- Removed the temporary 'n' key event listener previously used for advancing turns.

This fulfills all acceptance criteria:
- During an enemy unit's turn, if not adjacent to the player, it moves one tile closer (first X, then Y) if a valid path exists.
- Enemy movement uses `isValidMoveTarget`, thus following similar rules as player movement (valid tiles, grid boundaries, not moving onto other units).
- Simple pathfinding (X then Y) is used.
- MVP targets the single player unit (handled by `findPlayerUnit`).
