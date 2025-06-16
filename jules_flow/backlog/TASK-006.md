---
id: TASK-006
title: "Implement 'Charge Time' (CT) Turn System"
epic: "Phase 1: The Tactical Core - A Rich 'Vertical Slice'"
status: backlog
priority: medium
dependencies: []
assignee: Jules
---

### Descrição

Develop the FFT-like Charge Time turn system. Units gain CT based on Agility; act at CT >= 100. Actions have cast times, delaying resolution. Implement a clear Turn Order UI.

### Critérios de Aceitação

- [ ] At the start of every "tick", every unit on the field gains `CT` equal to its `Agility`.
- [ ] When a unit's `CT >= 100`, it gets a turn. Its `CT` is reset to 0.
- [ ] Actions (spells, special moves) have a `cast_time`. When a unit performs a slow action, it enters a "casting" state and its turn only resolves after its `CT` fills up again by the `cast_time` amount.
- [ ] UI: The Turn Order UI must clearly show not just *who* is next, but *when*, visually representing the CT of all units.

### Arquivos Relevantes

* `src/battle/turn_manager.rs` (suggested)
* `src/battle/systems/ct_system.rs` (suggested)
* `src/ui/turn_order_ui.rs` (suggested)

### Relatório de Execução

(Esta seção deve ser deixada em branco no template)
