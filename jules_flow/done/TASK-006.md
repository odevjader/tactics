---
id: TASK-006
title: "Player Unit Movement"
epic: "Phase 1 (MVP): Browser-Based Combat Core"
status: done
priority: medium
dependencies: []
assignee: Jules
---

### Descrição

Enable the selected player unit to move to an adjacent, valid tile on the grid. Movement is restricted to one tile per turn for the MVP.

### Critérios de Aceitação

- [ ] After selecting a unit, clicking on an adjacent empty tile moves the unit to that tile.
- [ ] Unit cannot move to occupied tiles.
- [ ] Unit cannot move outside the grid boundaries.
- [ ] Movement is limited to one adjacent tile (horizontally or vertically, diagonals TBD or excluded for MVP).
- [ ] Unit's visual position on the grid updates after moving.
- [ ] Moving a unit consumes the move action for the turn (or the entire turn for MVP).

### Arquivos Relevantes

* `js/main.js`

### Relatório de Execução

Implemented player unit movement functionality in `js/main.js`.
- Created helper function `isCellOccupied(x, y)` to check if a grid cell is occupied by any unit.
- Created helper function `isValidMoveTarget(unit, targetX, targetY)` which checks:
    - If the target is within grid boundaries.
    - If the target cell is not occupied (using `isCellOccupied`).
    - If the target is exactly one cell away horizontally or vertically (Manhattan distance of 1).
- Enhanced `handleCanvasClick(event)`:
    - If it's the player's turn and their unit is `selectedUnit`:
        - If the clicked cell is a valid move according to `isValidMoveTarget`:
            - The `selectedUnit`'s `x` and `y` coordinates are updated to the target cell.
            - A message is logged to the console confirming the move.
            - `selectedUnit` is set to `null` (deselected).
            - `nextTurn()` is called to end the player's turn.
            - An `actionTakenThisClick` flag is set true.
        - If the click is not a valid move but on the `selectedUnit` itself, it remains selected.
        - Otherwise (clicked elsewhere, not a valid move), `selectedUnit` is set to `null`.
    - If it's the player's turn but no unit is selected (or a different unit was selected), it attempts to select the player's unit if clicked.
    - If it's not the player's turn, or no action/selection occurs, `selectedUnit` is cleared.
    - `gameLoop()` is called to reflect changes.

This fulfills all acceptance criteria:
- After selecting a unit, clicking an adjacent empty tile moves the unit.
- Unit cannot move to occupied tiles (checked by `isCellOccupied` via `isValidMoveTarget`).
- Unit cannot move outside grid boundaries (checked by `isValidMoveTarget`).
- Movement is limited to one adjacent tile (horizontally or vertically, checked by `isValidMoveTarget`).
- Unit's visual position updates (due to `gameLoop()` redraw after coordinate change).
- Moving a unit consumes the turn (verified by `nextTurn()` call).
