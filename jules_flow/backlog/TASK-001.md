---
id: TASK-001
title: "Setup Project Scaffolding"
epic: "Phase 0: The Engine - Architecture & Core Systems"
status: done
priority: medium
dependencies: []
assignee: Jules
---

### Descrição

Establish the initial project structure, dependencies, and module organization as outlined in Phase 0 of the roadmap.

### Critérios de Aceitação

- [ ] Setup project with `cargo`, `bevy`, `serde`, `ron`, `bevy_ecs_tilemap`, `bevy_pathfinding`.
- [ ] Establish a strict module structure: `src/main.rs`, `src/state.rs`, `src/systems/`, `src/components.rs`, `src/data_loading.rs`, `src/battle/`.

### Arquivos Relevantes


### Relatório de Execução

Project scaffolding initiated.
- **Cargo.toml Setup:**
  - Initialized with standard package information.
  - Added `bevy = "0.12"`
  - Added `serde = { version = "1.0.219", features = ["derive"] }`
  - Added `ron = "0.10.1"`
  - Added `bevy_ecs_tilemap = "0.12"`
  - **Issue:** Failed to add `bevy_pathfinding`. No compatible version with `bevy@0.12` could be resolved by `cargo add`. This dependency is currently missing. Recommend creating a follow-up task to address this.
- **Module Structure:**
  - Created directory `src/systems/` with `.gitkeep`.
  - Created directory `src/battle/` with `.gitkeep`.
  - Created placeholder files: `src/main.rs` (ensured basic main function), `src/state.rs`, `src/components.rs`, `src/data_loading.rs`.

All other acceptance criteria met.
