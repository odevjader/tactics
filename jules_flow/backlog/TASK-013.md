---
id: TASK-013
title: "Win Condition: Defeat All Enemies"
epic: "Phase 1 (MVP): Browser-Based Combat Core"
status: done
priority: medium
dependencies: []
assignee: Jules
---

### Descrição

Implement the win condition for the MVP: the player wins if all enemy units are defeated.

### Critérios de Aceitação

- [ ] The game checks after each enemy defeat if all enemy units have been defeated.
- [ ] If all enemies are defeated, a "You Win!" message is displayed.
- [ ] Game input/further actions are paused or disabled after the win message.

### Arquivos Relevantes

* `js/main.js`

### Relatório de Execução

Implemented the win condition (defeat all enemies) in `js/main.js`.
- Added global variables `gameOver` (boolean, initially `false`) and `gameStatusMessage` (string).
- Created `checkWinCondition()` function:
    - If `gameOver` is true, returns.
    - Ensures a player unit is still alive.
    - Counts remaining enemy units with `hp > 0`.
    - If zero enemies remain (and player is alive), sets `gameOver = true`, `gameStatusMessage = "You Win!"`, and logs this.
- Created `drawGameOverMessage()` function:
    - If `gameOver` is true, displays `gameStatusMessage` centered on the canvas with a semi-transparent background.
- Updated `gameLoop()` to call `drawGameOverMessage()` last, so it overlays other elements.
- Modified `handleCanvasClick` and `nextTurn` (for enemy turn scheduling) to check the `gameOver` flag at the beginning. If true, further game actions by player or AI are prevented, and appropriate messages are logged.
- `checkWinCondition()` is called after `cleanupDefeatedUnits()` in both player attack (`handleCanvasClick`) and enemy attack (`executeEnemyTurn`) sequences.

This fulfills all acceptance criteria:
- The game checks if all enemy units have been defeated after any action that might lead to an enemy's defeat (via `checkWinCondition` called after `cleanupDefeatedUnits`).
- If all enemies are defeated (and player is alive), a "You Win!" message is displayed on the canvas and logged.
- Game input/further actions are paused/disabled after the win condition is met (due to checks of `gameOver` flag in `handleCanvasClick` and `nextTurn`).
