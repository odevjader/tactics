---
id: TASK-008
title: "Enemy AI: Movement towards Player"
epic: "Phase 1 (MVP): Browser-Based Combat Core"
status: backlog
priority: medium
dependencies: []
assignee: Jules
---

### Descrição

Implement simple AI logic for enemy units to move towards the player unit if they are not already adjacent.

### Critérios de Aceitação

- [ ] During an enemy unit's turn, if not adjacent to the player, it moves one tile closer to the player unit.
- [ ] Enemy movement follows the same rules as player movement (e.g., valid tiles, grid boundaries).
- [ ] A simple pathfinding (e.g., move horizontally then vertically, or vice-versa, to reduce distance) is used.
- [ ] If multiple player units exist (post-MVP), a target selection rule is needed (MVP: target the single player unit).

### Arquivos Relevantes

*

### Relatório de Execução

(Esta seção deve ser deixada em branco no template)
