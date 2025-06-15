---
id: TASK-010
title: "Combat Resolution: HP and Damage"
epic: "Phase 1 (MVP): Browser-Based Combat Core"
status: done
priority: medium
dependencies: []
assignee: Jules
---

### Descrição

Implement health points (HP) for units and a fixed damage system for attacks as per MVP scope (e.g., player deals 1 HP, enemy deals 1 HP).

### Critérios de Aceitação

- [ ] Player and enemy units have an HP attribute (e.g., 2-3 HP for MVP).
- [ ] When an attack occurs, the target unit's HP is reduced by a fixed amount (e.g., 1 HP).
- [ ] HP values cannot go below zero.

### Arquivos Relevantes

* `js/main.js`

### Relatório de Execução

Verified and completed implementation of HP and Damage for MVP scope in `js/main.js`.
- Confirmed that player and enemy units have an `hp` attribute (initial values: Player 3 HP, Enemies 2 HP, as set in TASK-003).
- Confirmed that player attacks reduce enemy HP by a fixed amount of 1 (as implemented in TASK-007).
- Confirmed that enemy attacks reduce player HP by a fixed amount of 1 (as implemented in TASK-009).
- Added HP clamping logic to ensure HP values do not go below zero:
    - In `handleCanvasClick` (player's attack on enemy): After `targetUnit.hp -= 1;`, added `if (targetUnit.hp < 0) { targetUnit.hp = 0; }`.
    - In `executeEnemyTurn` (enemy's attack on player): After `playerUnit.hp -= 1;`, added `if (playerUnit.hp < 0) { playerUnit.hp = 0; }`.
    - Console logs for HP after attacks were confirmed to reflect potentially clamped values.

This fulfills all acceptance criteria:
- Player and enemy units have an HP attribute.
- When an attack occurs, the target unit's HP is reduced by a fixed amount (1 HP).
- HP values cannot go below zero.
