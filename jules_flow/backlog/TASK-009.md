---
id: TASK-009
title: "Implement Job & Skill System"
epic: "Phase 2: The Character Engine - Systemic Depth & Progression"
status: backlog
priority: medium
dependencies: []
assignee: Jules
---

### Descrição

Develop the core Job and Skill system. Units have Primary/Secondary Jobs, earn JP, unlock skills, and equip them based on types (Action, Secondary, Reaction, Support, Movement). Build the Job/Skill UI.

### Critérios de Aceitação

- [ ] Job System: Every unit has a `PrimaryJob` and a `SecondaryJob`. Units gain Job Points (JP) for their `PrimaryJob` by performing actions in battle. Spending JP unlocks skills within that job's tree.
- [ ] Skill Mastery: Once a skill is unlocked, it can be equipped regardless of the unit's current job, provided they have the `Skill Slot` available.
- [ ] Skill Types:
    - [ ] Action Skills: Command sets from the equipped `PrimaryJob`.
    - [ ] Secondary Skills: A second action skill set from any *other* job the unit has access to.
    - [ ] Reaction Skills: Triggered by enemy actions (e.g., `Counter`). One slot.
    - [ ] Support Skills: Passive bonuses (e.g., `Attack+20%`). Multiple slots.
    - [ ] Movement Skills: Passive movement bonuses (e.g., `Ignore Terrain Cost`). One slot.
- [ ] UI: Build the comprehensive Job/Skill screen in the `PartyManagement` state.

### Arquivos Relevantes

* `src/battle/job_system.rs` (suggested)
* `src/battle/skill_system.rs` (suggested)
* `src/data_loading/job_data.rs` (suggested)
* `src/ui/job_skill_screen.rs` (suggested)
* `src/state.rs` (for PartyManagement state)

### Relatório de Execução

(Esta seção deve ser deixada em branco no template)
