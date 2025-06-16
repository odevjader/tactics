---
id: TASK-003
title: "Develop Core Component Library"
epic: "Phase 0: The Engine - Architecture & Core Systems"
status: backlog
priority: medium
dependencies: []
assignee: Jules
---

### Descrição

Define and implement the fundamental Bevy ECS components for game entities, including identity, primary stats, derived stats, and battle-related state.

### Critérios de Aceitação

- [ ] Implement Identity components: `UnitID(String)`, `Name(String)`, `PlayerControlled`, `AIControlled { profile: AIProfile }`.
- [ ] Implement Primary Stats component: `PrimaryStats { Strength, Dexterity, Agility, Intelligence, Vitality, Luck }`.
- [ ] Implement Secondary Stats component: `DerivedStats { HP, MaxHP, MP, MaxMP, Attack, Defense, MagicAttack, MagicDefense, Hit, Evasion, CritChance, CritDamage, MoveRange, JumpHeight }`. Include logic or a system for recalculating these based on primary stats, equipment, and buffs.
- [ ] Implement Battle State components: `GridPosition { x, y, z }`, `ActionPoints(u32)`, `ChargeTime(u32)`, `CurrentStatus(Vec<StatusEffect>)`, `Resistances(HashMap<Element, f32>)`.

### Arquivos Relevantes

* `src/components.rs`

### Relatório de Execução

(Esta seção deve ser deixada em branco no template)
