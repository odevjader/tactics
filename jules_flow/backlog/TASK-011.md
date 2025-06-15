---
id: TASK-011
title: "Combat Resolution: Visual Feedback for Attacks"
epic: "Phase 1 (MVP): Browser-Based Combat Core"
status: done
priority: medium
dependencies: []
assignee: Jules
---

### Descrição

Provide visual feedback when an attack occurs, such as the unit flashing red or a simple animation/effect.

### Critérios de Aceitação

- [ ] When a unit is hit by an attack, it visually indicates damage (e.g., flashes a color).
- [ ] (Optional MVP) A simple visual effect (e.g., a small "hit" sprite or line) is shown at the point of impact.

### Arquivos Relevantes

* `js/main.js`

### Relatório de Execução

Implemented visual feedback for attacks (hit sparks) in `js/main.js`.
- Added a global array `visualEffects` to manage temporary visual effects.
- Created a helper function `addHitSpark(xGrid, yGrid)`:
    - This function adds a new effect object to the `visualEffects` array.
    - The effect object stores coordinates (calculated to be the center of the target grid cell), an initial radius, a color ('yellow'), and a `duration` (10 frames) and `maxDuration`.
- Modified `handleCanvasClick` (player attack): When an enemy unit is successfully hit, `addHitSpark(targetUnit.x, targetUnit.y)` is called.
- Modified `executeEnemyTurn` (enemy attack): When the player unit is successfully hit, `addHitSpark(playerUnit.x, playerUnit.y)` is called.
- Created `drawVisualEffects()` function:
    - This function iterates through the `visualEffects` array.
    - For each effect, it draws a yellow filled circle (a "spark"). The radius of the circle shrinks as the effect's `duration` decreases.
    - It decrements the `duration` of each effect.
    - Effects are removed from the array once their `duration` reaches zero.
- Updated `gameLoop()` to call `drawVisualEffects()` each frame, ensuring effects are rendered and updated.

This fulfills the acceptance criteria:
- When a unit is hit by an attack, it visually indicates damage via a temporary yellow spark effect at the unit's location.
- This serves as a simple visual effect as per the task description and roadmap.
