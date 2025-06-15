---
id: TASK-015
title: "Minimal UI: Display Unit HP"
epic: "Phase 1 (MVP): Browser-Based Combat Core"
status: done
priority: medium
dependencies: []
assignee: Jules
---

### Descrição

Display the current HP of units, likely as a small number next to or below each unit on the grid.

### Critérios de Aceitação

- [ ] Each unit on the grid has its current HP displayed near it.
- [ ] The HP display updates whenever a unit takes damage.
- [ ] The display is clear and legible.

### Arquivos Relevantes

* `js/main.js`

### Relatório de Execução

Implemented display of unit HP in `js/main.js`.
- Modified the `drawUnit(unit)` function.
- After drawing the unit's colored rectangle and selection indicator (if applicable), the unit's current `hp` is drawn as text.
- HP text rendering details:
    - Color: 'white'
    - Font: 'bold 14px Arial'
    - Alignment: 'center' (horizontal), 'middle' (vertical)
    - Position: Centered on the visual representation of the unit.
- Since `drawUnit` is called every frame by `gameLoop` for all active units, the HP display updates automatically whenever a unit's `hp` attribute changes.

This fulfills all acceptance criteria:
- Each unit on the grid now has its current HP displayed near/on it.
- The HP display updates whenever a unit takes damage (due to redrawing each frame).
- The display is clear and legible (white text on colored unit backgrounds, centered).
