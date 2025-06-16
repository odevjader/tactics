---
id: TASK-008
title: "Develop Battle UI - Information is Power"
epic: "Phase 1: The Tactical Core - A Rich 'Vertical Slice'"
status: backlog
priority: medium
dependencies: []
assignee: Jules
---

### Descrição

Create essential battle UI elements: a Prediction Window (damage, hit/crit chance), a Combat Log, and an Inspect Mode for detailed unit stats.

### Critérios de Aceitação

- [ ] Prediction Window: Before confirming an action, show a detailed forecast: `Predicted Damage`, `Hit Chance %`, `Crit Chance %`.
- [ ] Combat Log: A scrollable log of all actions, damage, and events in the battle.
- [ ] Inspect Mode: Allow the player to hover over or click any unit (player or enemy) at any time to see its full stats, equipment, and status effects.

### Arquivos Relevantes

* `src/ui/battle_ui.rs` (suggested)
* `src/ui/prediction_window.rs` (suggested)
* `src/ui/combat_log.rs` (suggested)
* `src/ui/inspect_mode.rs` (suggested)

### Relatório de Execução

(Esta seção deve ser deixada em branco no template)
