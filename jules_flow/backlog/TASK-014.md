---
id: TASK-014
title: "Loss Condition: Player Unit Defeated"
epic: "Phase 1 (MVP): Browser-Based Combat Core"
status: done
priority: medium
dependencies: []
assignee: Jules
---

### Descrição

Implement the loss condition for the MVP: the player loses if their unit is defeated.

### Critérios de Aceitação

- [ ] The game checks if the player's unit HP reaches 0.
- [ ] If the player's unit is defeated, a "You Lose!" message is displayed.
- [ ] Game input/further actions are paused or disabled after the loss message.

### Arquivos Relevantes

* `js/main.js`

### Relatório de Execução

Implemented the loss condition (player unit defeated) in `js/main.js`.
- Created `checkLossCondition()` function:
    - If `gameOver` is true, returns.
    - Checks if any player unit (type 'player' with hp > 0) remains in the `units` array.
    - If no player units are alive, sets `gameOver = true`, `gameStatusMessage = "You Lose!"`, and logs this.
- Modified `handleCanvasClick` (player attack) and `executeEnemyTurn` (enemy attack):
    - `checkLossCondition()` is now called immediately after `cleanupDefeatedUnits()` and *before* `checkWinCondition()`. This ensures that if the player is defeated, the loss condition is triggered even if the same action also met the win condition.
- The existing `gameOver` flag, `gameStatusMessage`, `drawGameOverMessage()` function, and game-halting logic (from TASK-013) are utilized to display the "You Lose!" message and stop further interaction.

This fulfills all acceptance criteria:
- The game checks if the player's unit HP reaches 0 (implicitly via `cleanupDefeatedUnits` removing them, then `checkLossCondition` finding no live player units).
- If the player's unit is defeated, a "You Lose!" message is displayed on the canvas and logged.
- Game input/further actions are paused/disabled after the loss message is triggered (due to `gameOver` flag).
