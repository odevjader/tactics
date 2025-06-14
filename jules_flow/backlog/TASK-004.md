---
id: TASK-004
title: "Turn Management System"
epic: "Phase 1 (MVP): Browser-Based Combat Core"
status: done
priority: medium
dependencies: []
assignee: Jules
---

### Descrição

Implement a system to manage the turn order between the player and enemy units. For the MVP, this will be a simple alternating sequence (Player -> Enemy 1 -> Enemy 2 -> Player...).

### Critérios de Aceitação

- [ ] A system tracks whose turn it currently is (e.g., player, enemy1).
- [ ] Turns alternate correctly between player and enemy units.
- [ ] There is a visual indicator on the UI (can be simple text) showing whose turn it is.
- [ ] The system can handle 1 player and 1-2 enemy units.

### Arquivos Relevantes

* `js/main.js`

### Relatório de Execução

Implemented a basic turn management system in `js/main.js`.
- Added global variables `currentPlayerIndex` (initialized to 0) and `enemyCounter`.
- In `initializeCanvas()`:
    - Each unit in the `units` array is assigned a unique `id`.
    - Each unit is assigned a `turnDisplayName` (e.g., "Player's Turn", "Enemy 1's Turn", "Enemy 2's Turn") based on its type and order.
- Created `getCurrentTurnUnit()` function to retrieve the unit object whose turn it currently is from the `units` array using `currentPlayerIndex`.
- Created `drawTurnIndicator()` function to display the `turnDisplayName` of the current unit on the canvas (top-left corner).
- Updated `gameLoop()` to call `drawTurnIndicator()`.
- Implemented `nextTurn()` function to:
    - Increment `currentPlayerIndex`, cycling through the `units` array (which acts as the turn order).
    - Log the new turn's display name to the console.
    - Call `gameLoop()` to refresh the canvas and update the turn indicator.
- Added a temporary event listener for the 'n' key to call `nextTurn()` for testing purposes.

This fulfills all acceptance criteria:
- A system tracks whose turn it is (`currentPlayerIndex` referencing the `units` array).
- Turns alternate correctly (Player -> Enemy 1 -> Enemy 2 -> Player) via `nextTurn()` and 'n' key.
- A visual indicator shows whose turn it is on the canvas.
- The system handles 1 player and 2 enemy units as defined in `units`.
