---
id: TASK-005
title: "Implement The Living Battlefield System"
epic: "Phase 1: The Tactical Core - A Rich 'Vertical Slice'"
status: backlog
priority: medium
dependencies: []
assignee: Jules
---

### Descrição

Load maps from RON files, defining tile heights, types (Grass, Water, Thorns, Ice) affecting movement and status. Implement Line of Sight (LoS) checks. Develop a polished isometric camera system.

### Critérios de Aceitação

- [ ] Map System: Load maps from RON files, defining tile heights and types (`TileType::Grass`, `::Water`, `::Thorns`, `::Ice`) that affect movement cost and apply status effects on entry.
- [ ] Line of Sight (LoS): Implement LoS checks (e.g., archers cannot shoot through mountains). Some spells might ignore LoS.
- [ ] Camera System: A polished, player-friendly isometric camera: rotate, pan, zoom, and a "snap to active unit" function.

### Arquivos Relevantes

* `assets/data/maps/`
* `src/battle/map_system.rs` (suggested)
* `src/systems/camera_system.rs` (suggested)

### Relatório de Execução

(Esta seção deve ser deixada em branco no template)
