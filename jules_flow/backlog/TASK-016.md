---
id: TASK-016
title: "Minimal UI: End Turn Button/Mechanism"
epic: "Phase 1 (MVP): Browser-Based Combat Core"
status: done
priority: medium
dependencies: []
assignee: Jules
---

### Descrição

Provide a way for the player to manually end their turn, even if they have actions remaining. If not a button, actions (move/attack) automatically end the turn.

### Critérios de Aceitação

- [ ] An "End Turn" button is visible and clickable during the player's turn OR
- [ ] Performing a primary action (Move or Attack) automatically ends the player's turn.
- [ ] Clicking the button (if implemented) passes the turn to the next unit in sequence.

### Arquivos Relevantes

* `js/main.js`
* `index.html` (implicitly, as its canvas dimensions might be affected by styling or script, though `initializeCanvas` handles it in JS)

### Relatório de Execução

Implemented an "End Turn" button mechanism in `js/main.js`.
- Added constants to define the End Turn button's properties (position, size, color, text).
- Modified `initializeCanvas()` to increase `canvas.width` to make space for the button to the right of the game grid.
- Created `drawEndTurnButton()` function:
    - This function draws the button (a styled rectangle with text "End Turn") if it's currently the player's turn and the game is not over.
- Updated `gameLoop()` to call `drawEndTurnButton()`.
- Modified `handleCanvasClick(event)`:
    - It now first checks if a click falls within the End Turn button's area during the player's turn.
    - If the button is clicked:
        - A message is logged.
        - Any `selectedUnit` is cleared.
        - `nextTurn()` is called to pass the turn to the next unit.
        - The function returns, bypassing grid interaction logic for that click.
    - If the button is not clicked, the existing grid interaction logic (select, move, attack) proceeds.
- The pre-existing behavior where player move/attack actions automatically call `nextTurn()` also fulfills part of the task criteria.

This fulfills all acceptance criteria:
- An "End Turn" button is visible and clickable during the player's turn.
- Performing a primary action (Move or Attack) automatically ends the player's turn (from previous tasks).
- Clicking the button passes the turn to the next unit in sequence.
