---
id: TASK-002
title: "Canvas Grid Rendering"
epic: "Phase 1 (MVP): Browser-Based Combat Core"
status: done
priority: medium
dependencies: []
assignee: Jules
---

### Descrição

Implement the visual representation of the game's grid on the HTML5 canvas. The grid should be a fixed size as specified in the MVP (e.g., 8x8 or 10x10).

### Critérios de Aceitação

- [ ] A JavaScript function is created to draw a grid on the canvas.
- [ ] The grid lines (horizontal and vertical) are visible.
- [ ] The grid dimensions (e.g., 8x8 cells) are configurable or fixed as per MVP.
- [ ] The canvas is cleared before drawing the grid.

### Arquivos Relevantes

* `js/main.js`
* `index.html`

### Relatório de Execução

Implemented canvas grid rendering functionality.
- Created a new directory `js/`.
- Created a new file `js/main.js`.
- In `js/main.js`:
    - Added constants `GRID_SIZE` (set to 8) and `CELL_SIZE` (set to 50).
    - Implemented `initializeCanvas()` to set canvas dimensions (400x400px).
    - Implemented `clearCanvas()` to fill the canvas with a dark grey background.
    - Implemented `drawGrid()` to draw light grey lines for an 8x8 grid.
    - Added a simple `gameLoop()` function that calls `clearCanvas()` and `drawGrid()`.
    - Called `initializeCanvas()` and `gameLoop()` to draw the grid on load.
- Modified `index.html` to remove the previous inline script and added `<script src="js/main.js"></script>` at the end of the body to link the new JavaScript file.

This fulfills all acceptance criteria:
- A JavaScript function for drawing the grid exists (`drawGrid`).
- Grid lines are visible.
- Grid dimensions are fixed at 8x8.
- Canvas is cleared before drawing.
