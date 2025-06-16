---
id: TASK-002
title: "Implement Data-Driven Asset & Content Pipeline"
epic: "Phase 0: The Engine - Architecture & Core Systems"
status: backlog
priority: medium
dependencies: []
assignee: Jules
---

### Descrição

Develop the systems for loading game data (`.ron` files) into Bevy resources/assets and define the necessary Rust structs for data parsing.

### Critérios de Aceitação

- [ ] Implement a Master Loader System: A single system responsible for loading all `.ron` files from `assets/data/` into Bevy `Resources` or `Assets` on startup. Ensure it handles paths like `assets/data/classes/`, `assets/data/races/`, etc.
- [ ] Define RON Definitions: Create the Rust `structs` that `serde` will use to parse all data. This includes `ClassData`, `ItemData`, etc., with all their stats and properties.

### Arquivos Relevantes

* `assets/data/`
* `src/data_loading.rs`

### Relatório de Execução

(Esta seção deve ser deixada em branco no template)
