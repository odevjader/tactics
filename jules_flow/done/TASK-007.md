---
id: TASK-007
title: "Player Unit Attack"
epic: "Phase 1 (MVP): Browser-Based Combat Core"
status: done
priority: medium
dependencies: []
assignee: Jules
---

### Descrição

Enable the selected player unit to perform a basic melee attack against an adjacent enemy unit.

### Critérios de Aceitação

- [ ] After selecting a unit, clicking on an adjacent enemy unit initiates an attack.
- [ ] Attacks can only target units in adjacent tiles.
- [ ] Attacking an enemy unit consumes the attack action for the turn (or the entire turn for MVP).
- [ ] The game logic for damage calculation (MVP: fixed damage) is triggered.

### Arquivos Relevantes

* `js/main.js`

### Relatório de Execução

Implemented player unit attack functionality in `js/main.js`.
- Created `getUnitAt(x, y)` helper function to find a unit at specified grid coordinates.
- Created `isAdjacent(unit1, unit2OrX, y)` helper function to check orthogonal adjacency.
- Modified `handleCanvasClick(event)`:
    - If a player unit is selected and it's their turn:
        - It first checks for a valid move action.
        - If not a move, it then checks for an attack action:
            - It identifies if an enemy unit is at the clicked coordinates using `getUnitAt`.
            - It verifies if this enemy unit is adjacent to the selected player unit using `isAdjacent`.
            - If both conditions are met:
                - The target enemy's `hp` is reduced by 1 (MVP fixed damage).
                - Attack details (attacker, target, damage, new HP) are logged to the console.
                - The player unit is deselected (`selectedUnit = null`).
                - `nextTurn()` is called to end the player's turn.
                - An `actionTakenThisClick` flag is set to true.
        - If neither a valid move nor a valid attack, existing selection/deselection logic applies (e.g., re-clicking selected unit keeps it selected, clicking elsewhere deselects).
    - Other parts of click handling (initial selection, actions when not player's turn) remain consistent.
    - `gameLoop()` is called to update visuals.

This fulfills all acceptance criteria:
- After selecting a unit, clicking an adjacent enemy unit initiates an attack (verified by console logs and HP reduction).
- Attacks can only target units in adjacent tiles (verified by `isAdjacent` check).
- Attacking an enemy unit consumes the attack action for the turn (verified by `nextTurn()` call).
- Game logic for damage calculation (fixed 1 HP damage) is triggered and logged.
