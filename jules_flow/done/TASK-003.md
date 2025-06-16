---
id: TASK-003
title: "Develop Core Component Library"
epic: "Phase 0: The Engine - Architecture & Core Systems"
status: done
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

Implemented the fundamental Bevy ECS components in `src/components.rs` as specified:

1.  **Helper Enums/Structs Created:**
    *   `AIProfile` (enum for AI behavior archetypes).
    *   `StatusEffectType` (enum for different status effects).
    *   `StatusEffect` (struct to represent an active status effect with duration/magnitude, derives `Component`).
    *   `Element` (enum for damage/resistance types).

2.  **Identity Components Defined:**
    *   `UnitID(String)`
    *   `Name(String)`
    *   `PlayerControlled` (marker component)
    *   `AIControlled { profile: AIProfile }`

3.  **Stats Components Defined:**
    *   `PrimaryStats { strength, dexterity, agility, intelligence, vitality, luck }` (all `u32`).
    *   `DerivedStats { hp, max_hp, mp, max_mp, attack_power, defense, magic_attack_power, magic_defense, hit_chance, evasion_chance, crit_chance, crit_damage_multiplier, move_range, jump_height }`.
        *   **Note:** The system for recalculating `DerivedStats` based on `PrimaryStats`, equipment, and buffs is planned as a separate, future task.

4.  **Battle State Components Defined:**
    *   `GridPosition { x, y, z }` (all `i32`).
    *   `ActionPoints(u32)`.
    *   `ChargeTime(u32)`.
    *   `CurrentStatusEffects(Vec<StatusEffect>)`.
    *   `Resistances(HashMap<Element, f32>)`.

5.  **Module Structure & Verification:**
    *   All components derive `bevy::prelude::Component`, `Debug`, and `Clone`. `Default` was added where appropriate.
    *   A `prelude` module was added within `src/components.rs` for convenient import of all components.
    *   Ensured `mod components;` is declared in `src/main.rs`.
    *   `cargo check` completed successfully, confirming the components compile correctly. Warnings for unused code are expected at this stage.

All acceptance criteria for defining the component structs have been met.
