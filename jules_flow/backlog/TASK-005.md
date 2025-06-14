---
id: TASK-005
title: "Player Unit Selection"
epic: "Phase 1 (MVP): Browser-Based Combat Core"
status: done
priority: medium
dependencies: []
assignee: Jules
---

### Descrição

Allow the player to select their controllable unit on the grid, usually by clicking on it. This is a prerequisite for issuing move or attack commands.

### Critérios de Aceitação

- [ ] Player can click on their unit on the grid.
- [ ] When the player unit is selected, there is a visual indicator (e.g., highlight, border).
- [ ] If the player clicks elsewhere (not on a valid action), the unit can be deselected or selection can switch to another player unit if multiple were available.
- [ ] Only the player's own unit(s) can be selected during the player's turn.

### Arquivos Relevantes

* `js/main.js`

### Relatório de Execução

Implemented player unit selection functionality in `js/main.js`.
- Added a global variable `selectedUnit`, initialized to `null`.
- Modified `drawUnit(unit)`:
    - If `selectedUnit` is not null and its `id` matches the unit being drawn, a yellow border (2px lineWidth) is drawn around the unit as a selection indicator.
- Created `handleCanvasClick(event)` function:
    - Calculates grid cell coordinates from canvas click event.
    - Retrieves the `currentTurnUnit`.
    - If it's the player's turn (`currentTurnUnit.type === 'player'`):
        - It checks if any player-type unit is at the clicked grid coordinates.
        - If a player unit is clicked, it's set as the `selectedUnit`.
    - If no player unit was selected in the current click action (e.g., clicked an empty cell, an enemy unit, or it wasn't the player's turn to select), `selectedUnit` is set to `null` (deselection).
    - Calls `gameLoop()` to redraw the canvas and update visual feedback.
- Added a click event listener to the `canvas` element, which calls `handleCanvasClick`.

This fulfills all acceptance criteria:
- Player can click on their unit on the grid to select it (verified by visual indicator).
- When the player unit is selected, a yellow border appears.
- If the player clicks elsewhere, the unit is deselected (border disappears).
- Selection logic is gated: only the player's own unit can be selected, and only during the player's turn. (MVP has one player unit).
