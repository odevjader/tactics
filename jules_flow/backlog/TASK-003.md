---
id: TASK-003
title: "Unit Rendering (Player and Enemy)"
epic: "Phase 1 (MVP): Browser-Based Combat Core"
status: done
priority: medium
dependencies: []
assignee: Jules
---

### Descrição

Implement the visual representation of player and enemy units on the canvas. For the MVP, these can be simple shapes (e.g., colored squares or circles).

### Critérios de Aceitação

- [ ] A JavaScript function is created to draw units on the grid.
- [ ] Player unit(s) can be drawn at specified grid coordinates.
- [ ] Enemy unit(s) can be drawn at specified grid coordinates.
- [ ] Player and enemy units have distinct visual appearances (e.g., different colors).

### Arquivos Relevantes

* `js/main.js`

### Relatório de Execução

Implemented unit rendering functionality in `js/main.js`.
- Defined constants for `PLAYER_COLOR` ('blue'), `ENEMY_COLOR` ('red'), and `UNIT_SIZE_FACTOR` (0.8).
- Created an initial `units` array containing one player unit (blue, at 1,1) and two enemy units (red, at 5,5 and 6,2). Each unit object includes `x`, `y` coordinates, `color`, `hp`, and `type`.
- Implemented a `drawUnit(unit)` function that draws a unit as a colored rectangle, scaled by `UNIT_SIZE_FACTOR` and centered within its grid cell.
- Implemented a `drawUnits()` function that iterates through the `units` array and calls `drawUnit()` for each.
- Updated the `gameLoop()` function to call `drawUnits()` after `drawGrid()`, so units are drawn on top of the grid.

This fulfills all acceptance criteria:
- A JavaScript function to draw units (`drawUnits` and `drawUnit`) was created.
- Player unit can be drawn at specified coordinates.
- Enemy units can be drawn at specified coordinates.
- Player and enemy units have distinct visual appearances (blue and red colors).
