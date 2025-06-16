---
id: TASK-007
title: "Implement Deep Combat Mechanics"
epic: "Phase 1: The Tactical Core - A Rich 'Vertical Slice'"
status: backlog
priority: medium
dependencies: []
assignee: Jules
---

### Descrição

Define and implement the core damage formula, Area of Effect (AoE) patterns for skills, and a comprehensive suite of status effects.

### Critérios de Aceitação

- [ ] Damage Formula: Implement `FinalDamage = (BasePower * StatFactor - TargetDefense) * Multipliers`, considering skill/weapon BasePower, attacker stats, defender stats, and various multipliers (Elemental, Positional, Height, Crit, Buffs).
- [ ] Area of Effect (AoE): Skills must support multiple AoE patterns (Line, Cone, Radius, Cross, etc.) loaded from RON definitions. Targeting UI must preview these shapes accurately.
- [ ] Status Effects: Implement a full suite: Poison, Blind, Silence, Slow, Haste, Stop, Charm, Berserk, Petrify, Regen. The turn manager must apply their effects correctly.

### Arquivos Relevantes

* `src/battle/combat_system.rs` (suggested)
* `src/data_loading/skill_data.rs` (suggested)
* `src/components.rs` (for status effects)

### Relatório de Execução

(Esta seção deve ser deixada em branco no template)
