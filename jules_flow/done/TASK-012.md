---
id: TASK-012
title: "Combat Resolution: Unit Removal at 0 HP"
epic: "Phase 1 (MVP): Browser-Based Combat Core"
status: done
priority: medium
dependencies: []
assignee: Jules
---

### Descrição

Units whose HP reaches 0 are defeated and should be removed from the grid.

### Critérios de Aceitação

- [ ] When a unit's HP is reduced to 0, it is marked as defeated.
- [ ] Defeated units are visually removed from the game grid.
- [ ] Defeated units can no longer take actions or be targeted.

### Arquivos Relevantes

* `js/main.js`

### Relatório de Execução

Implemented removal of defeated units (HP <= 0) in `js/main.js`.
- Created a `cleanupDefeatedUnits()` function:
    - This function filters the global `units` array, removing any unit whose `hp` is 0 or less.
    - When a unit is removed, a message is logged to the console with its `turnDisplayName` and `id`.
    - The function returns `true` if any units were removed, `false` otherwise.
    - It relies on the existing `nextTurn()` logic to correctly handle `currentPlayerIndex` with the potentially modified `units` array.
- Called `cleanupDefeatedUnits()` in `handleCanvasClick` (after player's attack resolves and HP is clamped) before `nextTurn()`.
- Called `cleanupDefeatedUnits()` in `executeEnemyTurn` (after enemy's attack resolves and HP is clamped) before `nextTurn()` is scheduled.

This fulfills all acceptance criteria:
- When a unit's HP is reduced to 0, it is marked as defeated (implicitly, by having HP <= 0).
- Defeated units are visually removed from the game grid (because `drawUnits` iterates the filtered `units` array).
- Defeated units can no longer take actions or be targeted (because they are removed from the `units` array, affecting turn management, targeting functions like `getUnitAt` and `findPlayerUnit`).
